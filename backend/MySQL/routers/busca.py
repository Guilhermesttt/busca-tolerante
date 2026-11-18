from time import perf_counter
from typing import Annotated

from fastapi import APIRouter, HTTPException, Query
from mysql.connector import Error

from database.mysql_db import connection

router = APIRouter(prefix="/busca", tags=["Busca"])


def escape_like(value: str) -> str:
    """Trata %, _ e \\ como texto literal, não como coringas de SQL LIKE."""
    return value.replace("\\", "\\\\").replace("%", "\\%").replace("_", "\\_")


@router.get("/mysql")
def busca_mysql(
    termo: Annotated[str, Query(max_length=200)] = "",
    limite: Annotated[int, Query(ge=1, le=100)] = 30,
):
    termo_limpo = termo.strip()
    if not termo_limpo:
        return {
            "motor": "MySQL",
            "termo_buscado": "",
            "resultados": [],
            "tempo_ms": 0.0,
        }

    padrao = f"%{escape_like(termo_limpo)}%"
    consulta = """
        SELECT id, titulo, autor, genero, ano, sinopse
        FROM livros
        WHERE titulo LIKE %s OR autor LIKE %s OR sinopse LIKE %s
        ORDER BY titulo, id
        LIMIT %s
    """

    inicio = perf_counter()
    try:
        with connection() as cnx:
            with cnx.cursor(dictionary=True) as cursor:
                cursor.execute(consulta, (padrao, padrao, padrao, limite))
                resultados = cursor.fetchall()
    except Error as exc:
        raise HTTPException(status_code=503, detail="Falha ao consultar MySQL") from exc

    return {
        "motor": "MySQL",
        "termo_buscado": termo_limpo,
        "quantidade_retornada": len(resultados),
        "resultados": resultados,
        "tempo_ms": round((perf_counter() - inicio) * 1000, 2),
    }