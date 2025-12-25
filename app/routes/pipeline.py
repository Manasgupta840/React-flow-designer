from fastapi import APIRouter
from app.schemas.pipeline import Pipeline
from app.helpers.graph import is_dag

router = APIRouter(prefix="/pipelines", tags=["pipelines"])

@router.post("/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)
    dag = is_dag(pipeline.nodes, pipeline.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag
    }
