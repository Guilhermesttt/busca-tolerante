# Busca tolerante a erros de digitação

Sistema de busca instantânea em um catálogo de **20.000 livros** (`backend/acervo/acervo.json`) comparando **Meilisearch** (índice invertido, tolerância a typos, facetas e destaque) contra **MySQL / MariaDB** com `LIKE '%termo%'`.

- **Backend:** FastAPI + Meilisearch + MySQL/MariaDB (`mysql-connector-python`)
- **Frontend:** React + TypeScript + Vite + Tailwind CSS + Framer Motion
- **Documentação de engenharia:** [AGENTS.md](AGENTS.md) e pasta [docs/](docs/)

---

## Pré-requisitos

- **Python 3.11+** (recomendado 3.12+)
- **Node.js 20+** e `npm`
- **Docker + Docker Compose** *(recomendado)* **ou** Meilisearch + MySQL/MariaDB instalados localmente

---

## Opção 1 — Subir Meilisearch e MySQL/MariaDB com Docker Compose (Windows, macOS e Linux)

Na raiz do repositório:

1. Suba os serviços de apoio:
   ```bash
   docker compose up -d
   ```
   Isso inicia:
   - **Meilisearch** na porta `7700` (com `MEILI_MASTER_KEY=busca-tolerante-local-master-key-2026`)
   - **MariaDB (compatível com MySQL)** na porta `3306` (já criando o banco `acervo_busca` e a tabela `livros` via `backend/MySQL/schema.sql`)

2. Consulte as chaves do Meilisearch e configure o `backend/.env`:
   - No **macOS / Linux**:
     ```bash
     cd backend
     cp .env_example .env
     curl -s http://127.0.0.1:7700/keys -H "Authorization: Bearer busca-tolerante-local-master-key-2026"
     ```
   - No **Windows (PowerShell)**:
     ```powershell
     cd backend
     Copy-Item .env_example .env
     Invoke-RestMethod -Uri "http://127.0.0.1:7700/keys" -Headers @{ Authorization = "Bearer busca-tolerante-local-master-key-2026" } | Select-Object -ExpandProperty results
     ```
   Preencha `MEILI_SEARCH_KEY` (chave `Default Search API Key`) e `MEILI_ADMIN_KEY` (chave `Default Admin API Key`) no arquivo `backend/.env`.

---

## Opção 2 — Executar sem Docker por Sistema Operacional

### Windows (PowerShell)

1. **Instale o Meilisearch e o MariaDB/MySQL:**
   - Baixe `meilisearch-windows-amd64.exe` das [releases oficiais do Meilisearch](https://github.com/meilisearch/meilisearch/releases), renomeie para `meilisearch.exe` e coloque em `backend/.meili/` junto com `master.key` (o FastAPI inicia o binário local automaticamente ao rodar o `uvicorn`), **ou** execute manualmente:
     ```powershell
     $env:MEILI_MASTER_KEY = "busca-tolerante-local-master-key-2026"
     .\meilisearch.exe --http-addr 127.0.0.1:7700
     ```
   - Instale o MySQL ou MariaDB (`winget install MariaDB.Server`), aplique `backend/MySQL/schema.sql` e configure `MYSQL_*` em `backend/.env`.

2. **Crie o ambiente Python, instale dependências e importe os dados:**
   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python -m scripts.seed_data
   python -m scripts.importar_mysql
   python -m uvicorn main:app --reload
   ```

3. **Em outro terminal, suba o frontend:**
   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

---

### macOS (zsh / bash)

1. **Instale os serviços via Homebrew (caso não use Docker):**
   ```bash
   brew install meilisearch mariadb
   brew services start mariadb
   meilisearch --master-key="busca-tolerante-local-master-key-2026" --http-addr 127.0.0.1:7700
   ```
   Aplique o schema no banco:
   ```bash
   mariadb -u root < backend/MySQL/schema.sql
   ```

2. **Configure o backend e importe os 20.000 livros:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   cp .env_example .env
   # Preencha MEILI_SEARCH_KEY, MEILI_ADMIN_KEY e MYSQL_PASSWORD no .env
   python -m scripts.seed_data
   python -m scripts.importar_mysql
   uvicorn main:app --reload
   ```

3. **Em outro terminal, suba o frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

---

### Linux (Ubuntu / Debian / Arch)

1. **Instale o Meilisearch e o MariaDB/MySQL (caso não use Docker):**
   ```bash
   # Meilisearch
   curl -L https://install.meilisearch.com | sh
   ./meilisearch --master-key="busca-tolerante-local-master-key-2026" --http-addr 127.0.0.1:7700

   # MariaDB (Ubuntu/Debian)
   sudo apt update && sudo apt install -y mariadb-server
   sudo systemctl enable --now mariadb
   sudo mariadb < backend/MySQL/schema.sql
   ```

2. **Configure o backend e importe os 20.000 livros:**
   ```bash
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   cp .env_example .env
   # Preencha MEILI_SEARCH_KEY, MEILI_ADMIN_KEY e MYSQL_PASSWORD no .env
   python -m scripts.seed_data
   python -m scripts.importar_mysql
   uvicorn main:app --reload
   ```

3. **Em outro terminal, suba o frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

Acesse a aplicação em **`http://localhost:5173`**.

---

## Testes Automatizados (`pytest`)

Para validar as regras centrais do desafio (escape seguro de curingas `LIKE`, normalização de acervo, busca MySQL parametrizada, filtros/facetas/highlight do Meilisearch e respostas `503`):

```bash
cd backend
python -m pytest -v
```

---

## Pergunta Central e Decisões de Arquitetura

As decisões detalhadas estão em [AGENTS.md](AGENTS.md) e na pasta [docs/](docs/):

- **Por que o `LIKE` não trata erro de digitação nem acentuação?**  
  `LIKE '%termo%'` realiza correspondência literal de substring contígua e não calcula distância de edição (Levenshtein). O `%` à esquerda também impede o uso do índice B-Tree (`idx_titulo`), forçando um *Full Table Scan*. Já a acentuação depende da *collation* (`utf8mb4_unicode_ci`), mas qualquer letra faltante ou sobrando faz a consulta retornar `0` resultados.
- **O que é um índice invertido?**  
  Estrutura que mapeia cada palavra/prefixo diretamente para a lista de IDs dos documentos onde ela aparece, evitando varrer os 20.000 livros linha a linha.
- **Relevância (`titulo` > `autor` > `sinopse`):**  
  Configurada em `backend/scripts/seed_data.py` via `searchableAttributes: ["titulo", "autor", "sinopse"]` com tolerância a 1 erro a partir de 4 letras e 2 erros a partir de 9 letras (`typoTolerance`).
- **Sincronização MySQL → Meilisearch:**  
  Carga idempotente pelo `id` primário e padrão **Transactional Outbox** documentado em [ADR-002](docs/ADR-002-relevancia-e-sincronizacao.md).

---

## Demonstração (10 buscas com erro de digitação)

Com a API rodando na porta `8000`, execute dentro de `backend/`:

```bash
python -m scripts.benchmark_busca --url http://127.0.0.1:8000
```

Resultado observado comparando as duas abordagens sobre os mesmos **20.000 livros**:

| Consulta | Meilisearch (ms) | Resultados Meilisearch | MySQL `LIKE` |
| --- | ---: | --- | --- |
| `harry poter` | ~21 ms | 7 retornados (*Harry Potter e a Câmara Secreta*, ...) | 0 retornados |
| `machado de asis` | ~18 ms | 30 retornados (*Memorial de Aires*, *Memórias Póstumas...*) | 0 retornados |
| `dom casmuro` | ~7 ms | 1 retornado (*Dom Casmurro*) | 0 retornados |
| `quincas borbaa` | ~17 ms | 1 retornado (*Quincas Borba*) | 0 retornados |
| `memorial de airesz` | ~6 ms | 1 retornado (*Memorial de Aires*) | 0 retornados |
| `camara secretta` | ~5 ms | 1 retornado (*Harry Potter e a Câmara Secreta*) | 0 retornados |
| `prisioneiro de azkabanx` | ~6 ms | 1 retornado (*Harry Potter e o Prisioneiro de Azkaban*) | 0 retornados |
| `ordem da fenixx` | ~6 ms | 1 retornado (*Harry Potter e a Ordem da Fênix*) | 0 retornados |
| `memorias postumas de bras cubass` | ~15 ms | 1 retornado (*Memórias Póstumas de Brás Cubas*) | 0 retornados |
| `reliquias da mortez` | ~5 ms | 1 retornado (*Harry Potter e as Relíquias da Morte*) | 0 retornados |
