from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.meili_db import start_local_meili
from MySQL.routers import busca
from routers import meili


@asynccontextmanager
async def lifespan(_app: FastAPI):
    meili_proc = start_local_meili()
    try:
        yield
    finally:
        if meili_proc is not None and meili_proc.poll() is None:
            meili_proc.terminate()
            try:
                meili_proc.wait(timeout=3)
            except Exception:
                meili_proc.kill()


app = FastAPI(
    title="API de Busca de Acervo",
    description="Comparativo de performance: MySQL (LIKE) vs Meilisearch",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(busca.router, prefix="/api")
app.include_router(meili.router, prefix="/api")

@app.get("/")
def health_check():
    return {
        "status": "online", 
        "mensagem": "Servidor rodando."
    }
