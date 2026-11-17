import type { SearchEngine } from '../types/book';

/**
 * Remove diacríticos (acentos) e normaliza caixa para comparação tolerante.
 */
export function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/**
 * Calcula distância de Levenshtein com saída antecipada para strings pequenas/médias.
 */
export function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;

  let prev = new Array<number>(n + 1);
  let curr = new Array<number>(n + 1);

  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[n];
}

/**
 * Regra de tolerância inspirada no Meilisearch:
 * - <= 4 chars: exato ou prefixo
 * - 5..8 chars: até 1 erro de digitação
 * - >= 9 chars: até 2 erros de digitação
 */
export function getMaxTypos(tokenLength: number): number {
  if (tokenLength <= 4) return 0;
  if (tokenLength <= 8) return 1;
  return 2;
}

/**
 * Verifica se uma palavra do documento corresponde ao token buscado no modo Meilisearch.
 */
export function isFuzzyTokenMatch(docWord: string, queryToken: string): boolean {
  const normWord = normalizeText(docWord);
  const normToken = normalizeText(queryToken);
  if (!normToken) return false;

  if (normWord.includes(normToken) || normWord.startsWith(normToken)) {
    return true;
  }

  const maxTypos = getMaxTypos(normToken.length);
  if (maxTypos === 0) return false;

  if (Math.abs(normWord.length - normToken.length) > maxTypos) {
    // Também checa prefixo aproximado para palavras mais longas durante digitação
    if (normWord.length > normToken.length && normToken.length >= 5) {
      const prefix = normWord.slice(0, normToken.length);
      return levenshtein(prefix, normToken) <= 1;
    }
    return false;
  }

  return levenshtein(normWord, normToken) <= maxTypos;
}

export interface HighlightRange {
  start: number;
  end: number;
}

/**
 * Calcula intervalos [start, end) a serem destacados em `text` para `query`,
 * respeitando a semântica de cada motor ('mysql' vs 'meili').
 */
export function findHighlightRanges(
  text: string,
  query: string,
  engine: SearchEngine
): HighlightRange[] {
  const trimmed = query.trim();
  if (!trimmed || !text) return [];

  const ranges: HighlightRange[] = [];

  if (engine === 'mysql') {
    // Simula LIKE '%termo%' case-insensitive mantendo fidelidade à substring digitada
    const lowerText = text.toLowerCase();
    const lowerQuery = trimmed.toLowerCase();
    let idx = lowerText.indexOf(lowerQuery);
    while (idx !== -1) {
      ranges.push({ start: idx, end: idx + lowerQuery.length });
      idx = lowerText.indexOf(lowerQuery, idx + lowerQuery.length);
    }
    return mergeRanges(ranges);
  }

  // Modo Meilisearch: destaca ocorrências exatas (sem acento) + tokens com fuzzy match
  const queryTokens = trimmed.split(/\s+/).filter(Boolean);
  const wordRegex = /[\p{L}\p{N}]+/gu;
  let match: RegExpExecArray | null;

  while ((match = wordRegex.exec(text)) !== null) {
    const word = match[0];
    const start = match.index;
    const end = start + word.length;

    for (const token of queryTokens) {
      const normWord = normalizeText(word);
      const normToken = normalizeText(token);

      // Se a substring normalizada ocorre dentro da palavra, destaca exatamente o trecho
      const subIdx = normWord.indexOf(normToken);
      if (subIdx !== -1 && normToken.length > 0) {
        ranges.push({ start: start + subIdx, end: start + subIdx + normToken.length });
      } else if (isFuzzyTokenMatch(word, token)) {
        ranges.push({ start, end });
      }
    }
  }

  return mergeRanges(ranges);
}

function mergeRanges(ranges: HighlightRange[]): HighlightRange[] {
  if (ranges.length <= 1) return ranges;
  const sorted = [...ranges].sort((a, b) => a.start - b.start || a.end - b.end);
  const merged: HighlightRange[] = [sorted[0]];

  for (let i = 1; i < sorted.length; i++) {
    const prev = merged[merged.length - 1];
    const curr = sorted[i];
    if (curr.start <= prev.end) {
      prev.end = Math.max(prev.end, curr.end);
    } else {
      merged.push({ ...curr });
    }
  }

  return merged;
}
