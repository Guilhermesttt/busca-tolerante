export type SearchEngine = 'mysql' | 'meili';

export interface Book {
  id: number | string;
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  sinopse: string;
}

export interface SearchResponse {
  motor: SearchEngine;
  termo_buscado: string;
  resultados: Book[];
  tempo_ms: number;
  fonte: 'api' | 'local-engine';
  tokens: string[];
}
