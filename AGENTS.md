# AGENTS.md — Arquitetura, Regras e Decisões do Projeto

Este documento define as regras de engenharia, estrutura de módulos e convenções aplicadas ao projeto **Busca Tolerante a Erros de Digitação** (Desafio 6 — Programação Avançada).

---

## 1. Visão Geral da Arquitetura

O sistema compara duas abordagens de busca sobre o mesmo acervo de **20.000 livros** (`backend/acervo/acervo.json`):

1. **Meilisearch (`GET /api/busca/meili`):** motor de busca de texto completo com **índice invertido**, tolerância a erros de digitação (Levenshtein), facetas dinâmicas (`genero`, `ano`) e destaque (`_formatted` com `<mark>`).
2. **MySQL / MariaDB (`GET /api/busca/mysql`):** abordagem relacional tradicional com `LIKE '%termo%'` parametrizado e `escape_like()`.

```
Frontend (React + Vite :5173)
   └──► FastAPI (:8000)
           ├── /api/busca/meili ──► Meilisearch (:7700)
           └── /api/busca/mysql ──► MySQL / MariaDB (:3306)
```

---

## 2. Estrutura de Pastas e Responsabilidades

- `backend/main.py`: inicializa o FastAPI, configura CORS (`http://localhost:5173`), registra routers e gerencia o `lifespan` (auto-start opcional de `backend/.meili/meilisearch.exe` no Windows).
- `backend/routers/meili.py`: endpoint `/api/busca/meili` (busca tolerante, filtros por facetas, recorte e highlight `<mark>`).
- `backend/MySQL/routers/busca.py`: endpoint `/api/busca/mysql` (`LIKE '%termo%'` com `escape_like`).
- `backend/MySQL/schema.sql`: DDL do banco `acervo_busca` (`utf8mb4_unicode_ci`) e tabela `livros`.
- `backend/database/meili_db.py` e `backend/database/mysql_db.py`: clientes e carregamento do `.env`.
- `backend/scripts/`:
  - `seed_data.py`: configura índice e importa 20.000 livros no Meilisearch.
  - `importar_mysql.py`: normaliza e importa 20.000 livros no MySQL/MariaDB.
  - `benchmark_busca.py`: executa 10 buscas com erro de digitação comparando os dois motores.
- `backend/tests/`: testes automatizados com `pytest`.
- `frontend/src/`: interface React + TypeScript + Tailwind CSS v4 com busca instantânea (debounce de 200 ms + cancelamento via `AbortController`).
- `docs/`: ADRs (Architecture Decision Records) e Especificação Técnica (`SPEC`).

---

## 3. Regras de Engenharia Aplicadas

1. **Segurança em SQL:** nunca concatenar input do usuário em queries. Toda consulta `LIKE` em `backend/MySQL/routers/busca.py` usa parâmetros preparados (`%s`) e `escape_like()` para neutralizar `%`, `_` e `\`.
2. **Segredos e dados locais fora do Git:** `.env`, `backend/.meili/`, `venv/` e `node_modules/` permanecem no `.gitignore`. Apenas `.env_example` é versionado.
3. **Respostas HTTP claras:** falhas de conexão com Meilisearch ou MySQL retornam `503 Service Unavailable` com mensagem objetiva, sem expor credenciais.
4. **Idempotência na carga:** tanto `seed_data.py` quanto `importar_mysql.py` usam o `id` primário do livro (`primary_key="id"` e `ON DUPLICATE KEY UPDATE`), permitindo reexecução segura.
5. **Testes obrigatórios:** qualquer alteração nas regras de busca, escape `LIKE`, normalização de acervo ou filtros deve manter a suíte `pytest` verde (`backend/tests/`).

---

## 4. Documentação Complementar

- [ADR-001: Meilisearch vs MySQL LIKE](docs/ADR-001-meilisearch-vs-mysql-like.md)
- [ADR-002: Relevância, Facetas e Sincronização](docs/ADR-002-relevancia-e-sincronizacao.md)
- [SPEC: Contrato da API e Busca Tolerante](docs/SPEC-busca-tolerante.md)
