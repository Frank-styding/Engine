import { $Node } from "./$Node";
import { Canvas } from "../canvas/Canvas";
import { drawChilds } from "./methods/draw";

export class $CanvasArea extends $Node {
  static readonly type: string = "NodeBase";
  canvas = new Canvas();

  setCanvas(canvas: Canvas) {
    this.canvas = canvas;
  }

  protected _reverseInit(): void {
    this.reverseInit();
  }

  protected _childsUpdated(): void {
    drawChilds(this);
  }
}
