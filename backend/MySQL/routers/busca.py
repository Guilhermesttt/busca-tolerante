from fastapi import APIRouter

router = APIRouter (
    prefix = "/busca",
    tags = ["Busca"]
)

# Rota para o Natalino implementar a lógica do MySQL (LIKE)
@router.get("/mysql")
def busca_mysql(termo: str):
    return {
        "motor": "MySQL", 
        "termo_buscado": termo, 
        "resultados": []
    }

# Rota para o Vinicius/Rubens implementarem a lógica do Meilisearch
@router.get("/meili")
def busca_meili(termo: str):
    return {
        "motor": "Meilisearch", 
        "termo_buscado": termo, 
        "resultados": []
    }