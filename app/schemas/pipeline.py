from pydantic import BaseModel
from typing import List

class Pipeline(BaseModel):
    nodes: List = []
    edges: List = []
