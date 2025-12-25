from fastapi import FastAPI
from app.core.cors import add_cors
from app.routes.pipeline import router as pipeline_router

app = FastAPI()

add_cors(app)

app.include_router(pipeline_router)

@app.get("/")
def read_root():
    return {"Ping": "Pong"}
