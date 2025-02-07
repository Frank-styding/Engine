import { $CanvasArea } from "../$CanvasArea";
import { $Node } from "../$Node";

export function drawChilds(canvasArea: $CanvasArea) {
  canvasArea.canvas.clear();
  canvasArea.draw(canvasArea.canvas.ctx);
  canvasArea.canvas.save();
  canvasArea.transform.getProjection().applyToCanvasCtx(canvasArea.canvas.ctx);
  const list = [...canvasArea.children];
  const drawList = [];

  while (list.length > 0) {
    const node = list.shift() as $Node;
    drawList.push(node);
    if (node instanceof $CanvasArea) continue;
    list.push(...node.children);
  }

  drawList.sort((a, b) => a.layerIdx - b.layerIdx);

  for (let node of drawList) {
    canvasArea.canvas.save();
    node.transform.applyGlovalTransform(canvasArea.canvas.ctx);
    if (node instanceof $CanvasArea) {
      canvasArea.canvas.draw(node.canvas);
    } else {
      node.draw(canvasArea.canvas.ctx);
    }
  }

  canvasArea.canvas.restore();
}
