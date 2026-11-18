import { Fragment, useMemo } from 'react';
import type { SearchEngine } from '../types/book';
import { buildSegments } from '../utils/highlight';

export interface HighlightTextProps {
  text: string;
  query: string;
  engine: SearchEngine;
  /** Versão já destacada pelo Meilisearch (com <mark>), se existir. */
  formatted?: string;
  className?: string;
}

/**
 * Renderiza o texto com marca-texto nos trechos que casaram com a busca.
 * O destaque é inline (sem caixa) para não quebrar a palavra em duas.
 */
export function HighlightText({
  text,
  query,
  engine,
  formatted,
  className,
}: HighlightTextProps) {
  const segments = useMemo(
    () => buildSegments(text, query, engine, formatted),
    [text, query, engine, formatted]
  );

  const highlightStyle =
    engine === 'meili' ? 'search-highlight-cyber' : 'search-highlight-mono';

  return (
    <span className={className}>
      {segments.map((segment, index) =>
        segment.highlighted ? (
          <mark
            key={index}
            className={`${highlightStyle} rounded-[2px] px-[1px] font-[inherit] transition-colors duration-200`}
          >
            {segment.text}
          </mark>
        ) : (
          <Fragment key={index}>{segment.text}</Fragment>
        )
      )}
    </span>
  );
}

export default HighlightText;
