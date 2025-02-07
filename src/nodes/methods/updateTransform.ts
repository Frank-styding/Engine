import { $Node } from "../$Node";

export function updateTransforms(node: $Node) {
  const memory = new Set<string>();
  const list: $Node[] = [];
  const nodes: $Node[] = [];

  const set = node.context.getUpdatedTransforms();
  set.forEach((id) => list.push(node.context.getNode(id) as $Node));
  set.clear();

  while (list.length > 0) {
    const node = list.shift() as $Node;
    if (memory.has(node.id)) continue;
    nodes.push(node);
    memory.add(node.id);
    list.push(...node.children);
  }
  nodes.sort((a, b) => a.treeIdx - b.treeIdx);

  for (let node of nodes) {
    node.transform.update();
  }
}
