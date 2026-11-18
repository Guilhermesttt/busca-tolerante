# ADR-002: Definição de Relevância, Tolerância a Typos e Sincronização

- **Status:** Aceito
- **Contexto:** Necessidade de ranquear resultados com precisão (título acima de sinopse) e manter o índice de busca consistente com o banco relacional.

---

## Decisões

### 1. Relevância e Tolerância a Erros (`backend/scripts/seed_data.py`)
- **`searchableAttributes`:** `["titulo", "autor", "sinopse"]`
  - No Meilisearch, a ordem da lista define o peso no critério de ranking por atributo: um termo encontrado no **título** pesa mais do que no **autor**, que pesa mais do que na **sinopse**.
- **`matchingStrategy`:** `"all"` (`backend/routers/meili.py`) — exige que todos os termos digitados estejam presentes no documento retornado.
- **`typoTolerance`:**
  - `oneTypo`: palavras com 4 ou mais caracteres permitem até 1 erro.
  - `twoTypos`: palavras com 9 ou mais caracteres permitem até 2 erros.
- **`filterableAttributes`:** `["genero", "ano"]` para facetas em tempo real.

### 2. Estratégia de Sincronização MySQL → Meilisearch
- Na carga inicial, ambos os bancos usam o mesmo `id` primário de `acervo.json` (operações idempotentes).
- Para cenários com escrita em produção (`INSERT`, `UPDATE`, `DELETE` no MySQL), adota-se o padrão **Transactional Outbox**:
  1. Alterações na tabela `livros` gravam, na **mesma transação SQL**, um evento em uma tabela de pendências (ex.: `outbox_eventos` com `livro_id`, `acao` e `status`).
  2. Um *worker* assíncrono consome os eventos pendentes, envia `add_documents` ou `delete_document` ao Meilisearch e só marca o evento como concluído após confirmação da tarefa.
  3. O `id` estável garante retentativas seguras caso o Meilisearch esteja temporariamente indisponível.

## Consequências

- Títulos e autores têm prioridade clara nos resultados sem exigir pós-processamento no frontend.
- Escritas no MySQL não ficam bloqueadas por latência de rede do motor de busca.
