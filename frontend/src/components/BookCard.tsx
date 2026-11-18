import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, SpellCheck } from 'lucide-react';
import type { Book, SearchEngine } from '../types/book';
import { buildSegments, findCorrections } from '../utils/highlight';
import { HighlightText } from './HighlightText';

export interface BookCardProps {
  book: Book;
  query: string;
  engine: SearchEngine;
  index: number;
}

type FieldKey = 'titulo' | 'autor' | 'genero' | 'ano' | 'sinopse';

const FIELD_LABELS: Record<FieldKey, string> = {
  titulo: 'título',
  autor: 'autor',
  genero: 'gênero',
  ano: 'ano',
  sinopse: 'sinopse',
};

/**
 * Card de resultado. Além do texto, mostra POR QUE o livro apareceu:
 * em quais campos houve match e, no modo tolerante, qual erro de digitação foi corrigido.
 */
export function BookCard({ book, query, engine, index }: BookCardProps) {
  const { fields, corrections } = useMemo(() => {
    const values: Record<FieldKey, string> = {
      titulo: book.titulo,
      autor: book.autor,
      genero: book.genero,
      ano: String(book.ano),
      sinopse: book.sinopse,
    };

    const matched: FieldKey[] = [];
    const highlightedWords: string[] = [];

    (Object.keys(values) as FieldKey[]).forEach((key) => {
      const formatted =
        key === 'ano' ? undefined : book._formatted?.[key];
      const segments = buildSegments(values[key], query, engine, formatted);
      const hits = segments.filter((s) => s.highlighted);
      if (hits.length > 0) {
        matched.push(key);
        hits.forEach((h) => highlightedWords.push(h.text));
      }
    });

    return {
      fields: matched,
      corrections: engine === 'meili' ? findCorrections(highlightedWords, query) : [],
    };
  }, [book, query, engine]);

  const fmt = book._formatted;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.985 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay: Math.min(index * 0.045, 0.35),
      }}
      whileHover={{ y: -3 }}
      className="squircle-card group relative overflow-hidden border border-steel/15 bg-black/60 p-4 backdrop-blur-xl transition-colors duration-200 hover:border-steel/35 hover:bg-black/70 sm:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-steel/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />

      <div className="flex gap-4">
        {/* Posição no ranking: a ordem importa no modo tolerante */}
        <span className="font-mono pt-1.5 text-[11px] text-steel/40 tabular-nums">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2.5">
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-lg font-black tracking-[-0.04em] text-white sm:text-xl">
                  <HighlightText text={book.titulo} query={query} engine={engine} formatted={fmt?.titulo} />
                </h2>
                <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-steel/50 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white group-hover:opacity-100" />
              </div>

              <p className="text-sm font-light text-white/60">
                <span className="text-steel/60">por </span>
                <HighlightText
                  text={book.autor}
                  query={query}
                  engine={engine}
                  formatted={fmt?.autor}
                  className="font-normal text-white/90"
                />
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span className="font-mono rounded-full border border-steel/20 px-2.5 py-1 text-[10px] tracking-wider text-white/75 uppercase">
                <HighlightText text={book.genero} query={query} engine={engine} formatted={fmt?.genero} />
              </span>
              <span className="font-mono rounded-full border border-steel/20 px-2.5 py-1 text-[10px] text-white/60 tabular-nums">
                <HighlightText text={String(book.ano)} query={query} engine={engine} />
              </span>
            </div>
          </div>

          <p className="line-clamp-3 text-sm leading-relaxed font-light text-white/60 transition-colors duration-200 group-hover:text-white/75">
            <HighlightText text={book.sinopse} query={query} engine={engine} formatted={fmt?.sinopse} />
          </p>

          {/* Por que este resultado apareceu */}
          <div className="font-mono flex flex-wrap items-center gap-x-3 gap-y-1.5 border-t border-steel/10 pt-3 text-[10px] tracking-wider text-steel/60 uppercase">
            <span className="flex items-center gap-1.5">
              match em
              {fields.map((f) => (
                <span key={f} className="rounded-full bg-tech/25 px-2 py-0.5 text-white/80">
                  {FIELD_LABELS[f]}
                </span>
              ))}
            </span>

            {corrections.map((c) => (
              <span key={c.found} className="flex items-center gap-1.5 normal-case tracking-normal text-steel">
                <SpellCheck className="h-3 w-3" />
                <span className="text-white/50 line-through decoration-white/30">{c.typed}</span>
                <span>→</span>
                <span className="text-white">{c.found}</span>
              </span>
            ))}

            {engine === 'mysql' && (
              <span className="normal-case tracking-normal text-white/40">
                LIKE &lsquo;%{query.trim()}%&rsquo; · substring exata
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default BookCard;
