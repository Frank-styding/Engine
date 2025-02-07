import { $NodeBase } from "../$NodeBase";

export function init(_node: $NodeBase) {
  const list: $NodeBase[] = [_node];
  let i = 0;
  while (i < list.length) {
    const node = list[i++];
    _node.context.connectGlovalContext(node);
    $NodeBase._reverseInit(node);
    if (!node.isRoot && !node.isInit) {
      _node.context.connectContext(node);
      for (let child of node.children) {
        child.treeIdx = node.treeIdx + 1;
        list.push(child);
      }
    }
    list.reverse();
    for (let node of list) {
      if (!node.isRoot || (node.isRoot && node.id == _node.id)) {
        $NodeBase._init(node);
        node.isInit = true;
      } else {
        _node.context.connectPrevContext(node);
        init(node);
      }
    }

    for (let node of list) {
      node.context.registerNode(node);
      if (!node.isReady) {
        $NodeBase._ready(node);
        node.isReady = true;
      }
    }
  }
}
