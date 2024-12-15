import { $Node } from "components/$Node";

const node1 = new $Node("node1");
const node2 = new $Node("node2");
const node3 = new $Node("node3");
const node4 = new $Node("node4");
const node5 = new $Node("node5");
const node6 = new $Node("node6");
const node7 = new $Node("node7");
const node8 = new $Node("node8");
const node9 = new $Node("node9");
const node10 = new $Node("node10");

node1.addChild(node2);
node1.addChild(node3);
node1.addChild(node4);
node1.addChild(node5);
node4.addChild(node6);
node4.addChild(node7);
node4.addChild(node8);
node8.addChild(node9);
node8.addChild(node10);

node4.transform.model.translate(10, 10);
node4.updateTransform();

$Node.init(node1);
$Node.update(0, node1);
$Node.updateTransform(node1);

console.log(node1);
