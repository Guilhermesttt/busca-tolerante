# ADR-001: Comparativo entre Meilisearch e MySQL (`LIKE '%termo%'`)

- **Status:** Aceito
- **Contexto:** Desafio 6 — Busca tolerante a erros de digitação em um acervo de 20.000 livros (`titulo`, `autor`, `sinopse`, `genero`, `ano`).

---

## Decisão

Adotar o **Meilisearch** como motor principal de busca instantânea e manter o **MySQL/MariaDB** com `LIKE '%termo%'` como linha de base (*baseline*) comparativa.

## Justificativa Técnica

1. **Por que o `LIKE '%termo%'` falha com erros de digitação e acentuação:**
   - `LIKE '%termo%'` exige correspondência literal de **substring contígua**. Não calcula distância de edição (inserção, remoção, substituição ou transposição de caracteres).
   - O curinga `%` à esquerda impede o uso do índice B-Tree (`idx_titulo`), forçando um **Full Table Scan** linha a linha.
   - O tratamento de acentos não é intrínseco ao `LIKE`, dependendo da *collation* da tabela (`utf8mb4_unicode_ci` equipara acentos comuns, mas continua falhando diante de qualquer caractere faltante ou sobrando).

2. **Por que o Meilisearch resolve o problema:**
   - Utiliza **índice invertido** (mapeia tokens e prefixos diretamente para os IDs dos documentos) combinado com autômato de tolerância a erros (Levenshtein).
   - Suporta facetas (`genero`, `ano`) e destaque nativo de trechos (`_formatted` com `<mark>`).

## Consequências

- O projeto mantém dois scripts de carga (`scripts.seed_data` e `scripts.importar_mysql`) sobre o mesmo `backend/acervo/acervo.json`.
- A comparação objetiva entre os dois motores fica reprodutível via `python -m scripts.benchmark_busca`.
