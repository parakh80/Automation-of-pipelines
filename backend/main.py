from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for all origins (adjust allow_origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Update with your frontend's origin if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    data: dict
    position: dict

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # Build a directed graph using networkx
    G = nx.DiGraph()

    # Add nodes to the graph
    for node in pipeline.nodes:
        G.add_node(node.id)

    # Add edges to the graph
    for edge in pipeline.edges:
        G.add_edge(edge.source, edge.target)

    # Check if the graph is a DAG
    is_dag = nx.is_directed_acyclic_graph(G)

    return {'num_nodes': num_nodes, 'num_edges': num_edges, 'is_dag': is_dag}