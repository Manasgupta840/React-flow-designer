from collections import defaultdict, deque

def is_dag(nodes, edges) -> bool:
    graph = defaultdict(list)
    in_degree = {node["id"]: 0 for node in nodes}

    # Build graph
    for edge in edges:
        src = edge["source"]
        tgt = edge["target"]
        graph[src].append(tgt)
        in_degree[tgt] += 1

    # Kahn's algorithm
    queue = deque([n for n in in_degree if in_degree[n] == 0])
    visited = 0

    while queue:
        node = queue.popleft()
        visited += 1

        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(nodes)