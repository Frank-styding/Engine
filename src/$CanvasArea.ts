import { $Node } from "./$Node";
import { MatrixState } from "./math/MatrixState";

export class $CanvasArea extends $Node {
  static Type = "CanvasArea";
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  projecion: MatrixState;
  width: number;
  height: number;

  constructor(name: string) {
    super(name);
    this.type = $CanvasArea.Type;
    this.isRootObject = true;
    this.canvas = document.createElement("canvas");
    this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.projecion = new MatrixState();
    this.width = 0;
    this.height = 0;
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  setCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  protected _invInit(): void {
    this.invInit();
  }

  protected _childsUpdated(t: number): void {
    $CanvasArea.drawChilds(this);
  }

  static drawChilds(canvasArea: $CanvasArea) {
    canvasArea.canvasCtx.clearRect(0, 0, canvasArea.width, canvasArea.height);
    canvasArea.draw(canvasArea.canvasCtx);
    canvasArea.canvasCtx.save();
    canvasArea.projecion.applyToCanvasCtx(canvasArea.canvasCtx);
    const list = [...canvasArea.children];
    const drawList = [];
    while (list.length > 0) {
      const node = list.shift() as $Node;
      if (!node.wasUpdated) continue;
      if (node instanceof $CanvasArea) {
        const _canvasArea = node as $CanvasArea;
        drawList.push(_canvasArea);
      } else {
        drawList.push(node);
        list.push(...node.children);
      }
    }

    drawList.sort((a, b) => a.layerIdx - b.layerIdx);

    for (let i = 0; i < drawList.length; i++) {
      const node = drawList[i];
      canvasArea.canvasCtx.save();
      node.transform.glovalTransform.applyToCanvasCtx(canvasArea.canvasCtx);
      if (node instanceof $CanvasArea) {
        const _canvasArea = node as $CanvasArea;
        canvasArea.canvasCtx.drawImage(_canvasArea.canvas, 0, 0);
      } else {
        node.draw(canvasArea.canvasCtx);
      }
    }
    canvasArea.canvasCtx.restore();
  }
}
