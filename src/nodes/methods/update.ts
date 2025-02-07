import { $NodeBase } from "../$NodeBase";

export function update(t: number, _node: $NodeBase) {
  type Path = { node: $NodeBase; path: $NodeBase[] };
  const paths: Path[] = [{ node: _node, path: [] }];
  const updatedNodes: $NodeBase[] = [];
  const memory: Set<string> = new Set();

  while (paths.length > 0) {
    const path = paths.shift() as Path;
    if (!path.node.isStatic && path.node.wasUpdated) {
      $NodeBase._update(path.node, t);
      for (let node of path.path) {
        if (!memory.has(node.id)) {
          updatedNodes.push(node);
          memory.add(node.id);
        }
      }
    }
    for (let child of path.node.children) {
      paths.push({
        node: child,
        path: [...path.path, path.node],
      });
    }
  }

  const nodes = updatedNodes.sort((a, b) => b.treeIdx - a.treeIdx);

  for (let node of nodes) {
    $NodeBase._update(node, t);
    $NodeBase._childsUpdated(node);
  }
}
