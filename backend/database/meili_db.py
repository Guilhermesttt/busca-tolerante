import os
import subprocess
import time
from pathlib import Path

import meilisearch
import requests
from dotenv import load_dotenv


BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env", override=True)


def _meili_is_healthy(url: str) -> bool:
    try:
        res = requests.get(f"{url.rstrip('/')}/health", timeout=0.5)
        return res.ok
    except requests.RequestException:
        return False


def start_local_meili() -> subprocess.Popen | None:
    """Inicia o Meilisearch local em backend/.meili caso ainda não esteja rodando."""
    url = os.getenv("MEILI_URL", "http://127.0.0.1:7700")
    if _meili_is_healthy(url):
        return None

    meili_dir = BACKEND_DIR / ".meili"
    executable = meili_dir / "meilisearch.exe"
    master_file = meili_dir / "master.key"
    if not executable.is_file() or not master_file.is_file():
        return None

    env = os.environ.copy()
    env["MEILI_MASTER_KEY"] = master_file.read_text(encoding="utf-8").strip()

    process = subprocess.Popen(
        [
            str(executable),
            "--http-addr",
            "127.0.0.1:7700",
            "--db-path",
            str(meili_dir / "data.ms"),
            "--no-analytics",
        ],
        cwd=str(meili_dir),
        env=env,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )

    for _ in range(25):
        if _meili_is_healthy(url):
            break
        if process.poll() is not None:
            return None
        time.sleep(0.2)

    return process


def livro_index(*, admin: bool = False):
    key_name = "MEILI_ADMIN_KEY" if admin else "MEILI_SEARCH_KEY"
    client = meilisearch.Client(
        os.getenv("MEILI_URL", "http://127.0.0.1:7700"),
        os.getenv(key_name) or None,
        timeout=30 if admin else 3,
    )
    return client.index(os.getenv("MEILI_INDEX", "livros"))
