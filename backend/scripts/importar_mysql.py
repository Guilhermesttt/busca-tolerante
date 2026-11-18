import argparse
import json
from pathlib import Path

from database.mysql_db import connection

DEFAULT_ACERVO = Path(__file__).resolve().parents[1] / "acervo" / "acervo.json"


def obter(registro: dict, *nomes: str, padrao=""):
    for nome in nomes:
        if nome in registro and registro[nome] is not None:
            return registro[nome]
    return padrao


def normalizar_acervo(conteudo):
    if isinstance(conteudo, dict):
        for campo in ("livros", "books", "items", "data"):
            if isinstance(conteudo.get(campo), list):
                conteudo = conteudo[campo]
                break
    if not isinstance(conteudo, list):
        raise ValueError("Formato inválido: esperado array de livros")

    linhas = []
    ids = set()
    for posicao, livro in enumerate(conteudo, 1):
        titulo = str(obter(livro, "titulo", "título", "title")).strip()
        if not titulo:
            raise ValueError(f"Livro na posição {posicao} não contém título")
        livro_id = int(obter(livro, "id", padrao=posicao))
        if livro_id <= 0 or livro_id in ids:
            raise ValueError(f"ID duplicado ou inválido na posição {posicao}: {livro_id}")
        ids.add(livro_id)

        ano_raw = obter(livro, "ano", "year", padrao=None)
        ano = int(ano_raw) if ano_raw not in (None, "") else None
        linhas.append((
            livro_id,
            titulo[:500],
            str(obter(livro, "autor", "author"))[:300],
            str(obter(livro, "sinopse", "description")),
            str(obter(livro, "genero", "gênero", "genre"))[:150],
            ano,
        ))
    return linhas


def importar(caminho: Path):
    conteudo = json.loads(caminho.read_text(encoding="utf-8-sig"))
    linhas = normalizar_acervo(conteudo)
    sql = """
        INSERT INTO livros (id, titulo, autor, sinopse, genero, ano)
        VALUES (%s, %s, %s, %s, %s, %s)
        ON DUPLICATE KEY UPDATE
            titulo=VALUES(titulo), autor=VALUES(autor), sinopse=VALUES(sinopse),
            genero=VALUES(genero), ano=VALUES(ano)
    """
    with connection() as cnx:
        with cnx.cursor() as cursor:
            for inicio in range(0, len(linhas), 500):
                cursor.executemany(sql, linhas[inicio:inicio + 500])
        cnx.commit()
    print(f"{len(linhas)} livros importados no MySQL.")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("arquivo", type=Path, nargs="?", default=DEFAULT_ACERVO)
    args = parser.parse_args()
    importar(args.arquivo)