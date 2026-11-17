import { MOCK_BOOKS } from '../data/mockBooks';
import type { Book, SearchEngine, SearchResponse } from '../types/book';
import { isFuzzyTokenMatch, normalizeText } from '../utils/textMatch';

const API_BASE_URL =
  import.meta.env.VITE_API_URL?.replace(/\/$/, '') || 'http://localhost:8000';

/**
 * Motor local fiel ao MySQL LIKE '%termo%':
 * exige substring contígua (case-insensitive) sem tolerância a typos.
 */
function runLocalMysqlLike(books: Book[], query: string): Book[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return books;

  return books.filter((book) => {
    const haystack = [
      book.titulo,
      book.autor,
      book.genero,
      String(book.ano),
      book.sinopse,
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(needle);
  });
}

/**
 * Motor local fiel ao Meilisearch:
 * tokeniza, normaliza diacríticos e pontua por match exato, prefixo e distância de Levenshtein.
 */
function runLocalMeilisearch(books: Book[], query: string): Book[] {
  const tokens = query.trim().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return books;

  const scored = books
    .map((book) => {
      const fields = [
        { text: book.titulo, weight: 4 },
        { text: book.autor, weight: 3 },
        { text: book.genero, weight: 2.5 },
        { text: String(book.ano), weight: 2 },
        { text: book.sinopse, weight: 1 },
      ];

      let score = 0;
      let matchedTokens = 0;

      for (const token of tokens) {
        const normToken = normalizeText(token);
        let bestTokenScore = 0;

        for (const field of fields) {
          const words = field.text.match(/[\p{L}\p{N}]+/gu) ?? [];
          for (const word of words) {
            const normWord = normalizeText(word);
            if (normWord === normToken) {
              bestTokenScore = Math.max(bestTokenScore, 10 * field.weight);
            } else if (normWord.startsWith(normToken)) {
              bestTokenScore = Math.max(bestTokenScore, 7 * field.weight);
            } else if (normWord.includes(normToken)) {
              bestTokenScore = Math.max(bestTokenScore, 5 * field.weight);
            } else if (isFuzzyTokenMatch(word, token)) {
              bestTokenScore = Math.max(bestTokenScore, 3 * field.weight);
            }
          }
        }

        if (bestTokenScore > 0) {
          matchedTokens++;
          score += bestTokenScore;
        }
      }

      return { book, score, matchedTokens };
    })
    .filter((entry) => entry.matchedTokens === tokens.length && entry.score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map((entry) => entry.book);
}

interface BackendApiPayload {
  motor?: string;
  termo_buscado?: string;
  resultados?: Array<Partial<Book> & Record<string, unknown>>;
  tempo_ms?: number;
}

function normalizeApiBook(raw: Partial<Book> & Record<string, unknown>, idx: number): Book {
  return {
    id: raw.id ?? idx + 1,
    titulo: String(raw.titulo ?? raw.title ?? 'Sem título'),
    autor: String(raw.autor ?? raw.author ?? 'Autor desconhecido'),
    genero: String(raw.genero ?? raw.genre ?? 'Acervo'),
    ano: Number(raw.ano ?? raw.year ?? 0),
    sinopse: String(raw.sinopse ?? raw.synopsis ?? ''),
  };
}

/**
 * Consulta o endpoint FastAPI correspondente (`/api/busca/mysql` ou `/api/busca/meili`).
 * Quando o backend está offline ou ainda retorna lista vazia (stub), aplica o motor
 * local equivalente sobre o catálogo para manter a demonstração interativa em tempo real.
 */
export async function searchBooks(
  query: string,
  engine: SearchEngine,
  externalSignal?: AbortSignal
): Promise<SearchResponse> {
  const startedAt = performance.now();
  const trimmed = query.trim();
  const tokens = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];

  if (!trimmed) {
    return {
      motor: engine,
      termo_buscado: '',
      resultados: MOCK_BOOKS,
      tempo_ms: Number((performance.now() - startedAt).toFixed(2)),
      fonte: 'local-engine',
      tokens: [],
    };
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 900);
  const onExternalAbort = () => controller.abort();
  externalSignal?.addEventListener('abort', onExternalAbort, { once: true });

  try {
    const endpoint = `${API_BASE_URL}/api/busca/${engine}?termo=${encodeURIComponent(trimmed)}`;
    const response = await fetch(endpoint, { signal: controller.signal });

    if (response.ok) {
      const data = (await response.json()) as BackendApiPayload;
      if (Array.isArray(data.resultados) && data.resultados.length > 0) {
        const elapsed =
          typeof data.tempo_ms === 'number'
            ? data.tempo_ms
            : Number((performance.now() - startedAt).toFixed(2));

        return {
          motor: engine,
          termo_buscado: data.termo_buscado ?? trimmed,
          resultados: data.resultados.map(normalizeApiBook),
          tempo_ms: elapsed,
          fonte: 'api',
          tokens,
        };
      }
    }
  } catch {
    // Fallback silencioso para o motor local se a API estiver indisponível ou abortada
  } finally {
    window.clearTimeout(timeoutId);
    externalSignal?.removeEventListener('abort', onExternalAbort);
  }

  const localStart = performance.now();
  const resultados =
    engine === 'mysql'
      ? runLocalMysqlLike(MOCK_BOOKS, trimmed)
      : runLocalMeilisearch(MOCK_BOOKS, trimmed);

  return {
    motor: engine,
    termo_buscado: trimmed,
    resultados,
    tempo_ms: Number(Math.max(0.2, performance.now() - localStart).toFixed(2)),
    fonte: 'local-engine',
    tokens,
  };
}
