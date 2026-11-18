import type { SearchEngine } from '../types/book';
import {
  findHighlightRanges,
  getMaxTypos,
  levenshtein,
  normalizeText,
} from './textMatch';

export interface Segment {
  text: string;
  highlighted: boolean;
}

/**
 * Divide um texto em trechos destacados / normais.
 * - Se o Meilisearch já devolveu `_formatted` (com <mark>), usa o destaque do próprio motor.
 * - Senão calcula localmente (mesma regra de cada motor).
 * O HTML do `_formatted` nunca é injetado: só as tags <mark> são lidas como delimitadores.
 */
export function buildSegments(
  text: string,
  query: string,
  engine: SearchEngine,
  formatted?: string
): Segment[] {
  if (formatted && formatted.includes('<mark>')) {
    const parts: Segment[] = [];
    const regex = /<mark>(.*?)<\/mark>/g;
    let cursor = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(formatted)) !== null) {
      if (match.index > cursor) {
        parts.push({ text: formatted.slice(cursor, match.index), highlighted: false });
      }
      parts.push({ text: match[1], highlighted: true });
      cursor = match.index + match[0].length;
    }
    if (cursor < formatted.length) {
      parts.push({ text: formatted.slice(cursor), highlighted: false });
    }
    return parts;
  }

  const ranges = findHighlightRanges(text, query, engine);
  if (ranges.length === 0) return [{ text, highlighted: false }];

  const parts: Segment[] = [];
  let cursor = 0;
  for (const range of ranges) {
    if (range.start > cursor) {
      parts.push({ text: text.slice(cursor, range.start), highlighted: false });
    }
    parts.push({ text: text.slice(range.start, range.end), highlighted: true });
    cursor = range.end;
  }
  if (cursor < text.length) {
    parts.push({ text: text.slice(cursor), highlighted: false });
  }
  return parts;
}

export interface Correction {
  typed: string;
  found: string;
}

/**
 * Detecta palavras que o motor encontrou apesar de erro de digitação:
 * o trecho destacado não contém o termo digitado, mas está a poucas edições dele.
 */
export function findCorrections(
  highlighted: string[],
  query: string
): Correction[] {
  const tokens = query.trim().split(/\s+/).filter((t) => t.length >= 4);
  const found: Correction[] = [];

  for (const word of highlighted) {
    const normWord = normalizeText(word);
    for (const token of tokens) {
      const normToken = normalizeText(token);
      if (normWord === normToken || normWord.startsWith(normToken)) continue;
      if (levenshtein(normWord, normToken) <= getMaxTypos(normToken.length)) {
        if (!found.some((c) => c.found === word)) {
          found.push({ typed: token, found: word });
        }
      }
    }
  }
  return found;
}
