import os
from contextlib import contextmanager
from pathlib import Path

import mysql.connector
from dotenv import load_dotenv

BACKEND_DIR = Path (__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env", override=True)

def config() -> dict:
    return {
        "host": os.getenv("MYSQL_HOST", "127.0.0.1"),
        "port": int(os.getenv("MYSQL_PORT", "3306")),
        "user": os.getenv("MYSQL_USER", "root"),
        "password": os.getenv("MYSQL_PASSWORD", ""),
        "database": os.getenv("MYSQL_DATABASE", "acervo_busca"),
        "connection_timeout": 10,
}

@contextmanager
def connection():
    cnx = mysql.connector.connect(**config())
    try:
        yield cnx
    finally:
        cnx.close()