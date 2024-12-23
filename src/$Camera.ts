import { Matrix } from "./math/Matrix";
import { $GameObject } from "./$GameObject";
import { $Node } from "./$Node";
import { $CanvasArea } from "./$CanvasArea";
import { $Scene } from "./$Scene";
import { registerEvents } from "./Events";

export class $Camera extends $GameObject {
  static Type = "Camera";
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  projecion: Matrix;
  width: number;
  height: number;
  constructor(name: string) {
    super(name);
    this.width = 0;
    this.height = 0;
    this.type = $Camera.Type;
    this.isRootObject = true;
    this.canvas = document.createElement("canvas");
    this.canvas.width = 0;
    this.canvas.height = 0;
    this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.projecion = new Matrix();
    this.events();
  }

  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }

  cameraIsUpdated() {
    this.wasUpdated = true;
  }

  connectScene(scene: $Scene) {
    registerEvents(
      scene.glovalContext,
      "update",
      this.cameraIsUpdated.bind(this)
    );
  }

  mosueDown(e: MouseEvent) {}
  mouseUp(e: MouseEvent) {}
  mouseMove(e: MouseEvent) {}
  mouseWheel(e: WheelEvent) {}

  events() {
    this.canvas.addEventListener("mousedown", this.mosueDown.bind(this));
    this.canvas.addEventListener("mouseup", this.mouseUp.bind(this));
    this.canvas.addEventListener("mousemove", this.mouseMove.bind(this));
    this.canvas.addEventListener("wheel", this.mouseWheel.bind(this));
  }

  static draw(camera: $Camera, node: $Node) {
    if (!camera.wasUpdated) return;
    const list = [node];
    camera.canvasCtx.clearRect(0, 0, camera.width, camera.height);
    camera.canvasCtx.save();
    camera.projecion.applyToCanvasCtx(camera.canvasCtx);
    while (list.length > 0) {
      const node = list.shift() as $Node;
      camera.canvasCtx.save();
      node.transform.glovalTransform.applyToCanvasCtx(camera.canvasCtx);
      if (node instanceof $CanvasArea) {
        camera.canvasCtx.drawImage(node.canvas, 0, 0);
      } else {
        node.draw(camera.canvasCtx);
        list.push(...node.children);
      }
      camera.canvasCtx.restore();
    }
    camera.wasUpdated = false;
  }
}
