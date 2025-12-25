from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

class Pipeline(BaseModel):
    nodes: list = []
    edges: list = []

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    return {'status': 'parsed'}

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
