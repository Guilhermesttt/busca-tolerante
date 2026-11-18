from contextlib import contextmanager
from unittest.mock import MagicMock, patch

import pytest
from fastapi import HTTPException
from meilisearch.errors import MeilisearchCommunicationError
from mysql.connector import Error as MySQLError

from MySQL.routers.busca import busca_mysql, escape_like
from routers.meili import busca_meili
from scripts.importar_mysql import normalizar_acervo


def test_escape_like_neutraliza_coringas_sql():
    assert escape_like(r"100% _teste\barra") == r"100\% \_teste\\barra"


def test_normalizar_acervo_aceita_campos_pt_e_en():
    linhas = normalizar_acervo([
        {"id": 1, "titulo": "Dom Casmurro", "autor": "Machado de Assis", "ano": 1899},
        {"id": 2, "title": "Harry Potter", "author": "J. K. Rowling", "year": 1997},
    ])
    assert len(linhas) == 2
    assert linhas[0] == (1, "Dom Casmurro", "Machado de Assis", "", "", 1899)
    assert linhas[1] == (2, "Harry Potter", "J. K. Rowling", "", "", 1997)


def test_normalizar_acervo_rejeita_livro_sem_titulo():
    with pytest.raises(ValueError, match="título"):
        normalizar_acervo([{"id": 1, "autor": "Autor Sem Título"}])


def test_busca_mysql_termo_vazio_nao_consulta_banco():
    with patch("MySQL.routers.busca.connection") as mock_conn:
        res = busca_mysql(termo="   ")
        mock_conn.assert_not_called()

    assert res["motor"] == "MySQL"
    assert res["resultados"] == []


def test_busca_mysql_aplica_like_parametrizado_e_retorna_resultados():
    fake_cursor = MagicMock()
    fake_cursor.fetchall.return_value = [
        {
            "id": 1,
            "titulo": "Dom Casmurro",
            "autor": "Machado de Assis",
            "genero": "Romance",
            "ano": 1899,
            "sinopse": "Clássico da literatura brasileira.",
        }
    ]

    fake_conn = MagicMock()
    fake_conn.cursor.return_value.__enter__.return_value = fake_cursor

    @contextmanager
    def fake_ctx():
        yield fake_conn

    with patch("MySQL.routers.busca.connection", fake_ctx):
        res = busca_mysql(termo="100% Dom", limite=15)

    assert res["motor"] == "MySQL"
    assert res["quantidade_retornada"] == 1
    assert res["resultados"][0]["titulo"] == "Dom Casmurro"

    sql, params = fake_cursor.execute.call_args[0]
    assert "LIKE %s" in sql
    assert params == (r"%100\% Dom%", r"%100\% Dom%", r"%100\% Dom%", 15)


def test_busca_mysql_retorna_503_quando_banco_indisponivel():
    @contextmanager
    def failing_ctx():
        raise MySQLError("Can't connect to MySQL server")
        yield

    with patch("MySQL.routers.busca.connection", failing_ctx):
        with pytest.raises(HTTPException) as exc:
            busca_mysql(termo="Dom Casmurro")

    assert exc.value.status_code == 503


def test_busca_meili_envia_filtros_facetas_e_highlight():
    fake_index = MagicMock()
    fake_index.search.return_value = {
        "hits": [
            {
                "id": 42,
                "titulo": "Harry Potter e a Câmara Secreta",
                "_formatted": {"titulo": "<mark>Harry</mark> <mark>Potter</mark> e a Câmara Secreta"},
            }
        ],
        "facetDistribution": {"genero": {"Fantasia": 1}, "ano": {"1998": 1}},
        "processingTimeMs": 2,
    }

    with patch("routers.meili.livro_index", return_value=fake_index):
        res = busca_meili(termo="harry poter", genero="Fantasia", ano=1998)

    assert res["motor"] == "Meilisearch"
    assert res["tempo_motor_ms"] == 2
    assert len(res["resultados"]) == 1
    assert "<mark>" in res["resultados"][0]["_formatted"]["titulo"]
    assert res["facetas"]["genero"] == {"Fantasia": 1}

    termo_enviado, opcoes = fake_index.search.call_args[0]
    assert termo_enviado == "harry poter"
    assert opcoes["filter"] == ['genero = "Fantasia"', "ano = 1998"]
    assert opcoes["facets"] == ["genero", "ano"]
    assert opcoes["matchingStrategy"] == "all"
    assert opcoes["attributesToHighlight"] == ["titulo", "autor", "sinopse"]


def test_busca_meili_retorna_503_quando_servico_indisponivel():
    fake_index = MagicMock()
    fake_index.search.side_effect = MeilisearchCommunicationError("Connection refused")

    with patch("routers.meili.livro_index", return_value=fake_index):
        with pytest.raises(HTTPException) as exc:
            busca_meili(termo="harry poter")

    assert exc.value.status_code == 503
