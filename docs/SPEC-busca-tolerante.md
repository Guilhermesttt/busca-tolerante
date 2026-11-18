# SPEC: Especificação do Sistema de Busca Tolerante

## 1. Endpoints da API (`FastAPI`)

### `GET /api/busca/meili`
- **Parâmetros de query:**
  - `termo` (`string`, máx. 300 caracteres): texto digitado pelo usuário.
  - `genero` (`string | null`, máx. 100 caracteres): filtro exato por gênero.
  - `ano` (`int | null`): filtro exato por ano.
- **Comportamento:**
  - Consulta o índice `livros` no Meilisearch com `limit=30`, `facets=["genero", "ano"]`, `attributesToHighlight=["titulo", "autor", "sinopse"]`, `attributesToCrop=["sinopse:32"]` e marcação `<mark>...</mark>`.
- **Resposta `200 OK`:**
  ```json
  {
    "motor": "Meilisearch",
    "termo_buscado": "harry poter",
    "resultados": [...],
    "facetas": { "genero": {...}, "ano": {...} },
    "tempo_ms": 5.4,
    "tempo_motor_ms": 2
  }
  ```

### `GET /api/busca/mysql`
- **Parâmetros de query:**
  - `termo` (`string`, máx. 200 caracteres): texto digitado pelo usuário.
  - `limite` (`int`, entre 1 e 100, padrão 30).
- **Comportamento:**
  - Escapa `%`, `_` e `\` via `escape_like()`.
  - Executa `SELECT id, titulo, autor, genero, ano, sinopse FROM livros WHERE titulo LIKE %s OR autor LIKE %s OR sinopse LIKE %s ORDER BY titulo, id LIMIT %s`.
- **Resposta `200 OK`:**
  ```json
  {
    "motor": "MySQL",
    "termo_buscado": "Dom Casmurro",
    "quantidade_retornada": 1,
    "resultados": [...],
    "tempo_ms": 18.2
  }
  ```

---

## 2. Comportamento do Frontend (`React + TypeScript`)

- **Busca instantânea:** debounce de `200 ms` e cancelamento de requisições anteriores com `AbortController`.
- **Alternância de motor:** seletor visual entre `Meilisearch` e `MySQL LIKE`.
- **Facetas:** filtros dinâmicos de `Gênero` e `Ano` no modo Meilisearch.
- **Destaque:** renderiza tags `<mark>` seguras vindas de `_formatted` no Meilisearch e correspondências exatas no MySQL.

---

## 3. Critérios de Aceite

1. Consultas com erros de digitação (ex.: `harry poter`, `machado de asis`, `dom casmuro`) retornam os livros esperados no Meilisearch.
2. O MySQL `LIKE` retorna resultados para termos exatos e `0` resultados para termos com erros de grafia, demonstrando a diferença prática.
3. A suíte `pytest` em `backend/tests/` passa integralmente.
