import { Matrix } from "./math/Matrix";
import { $GameObject } from "./$GameObject";
import { $Node } from "./$Node";
import { $CanvasArea } from "./$CanvasArea";
import { $Root } from "./$Root";
import { registerEvents } from "./Events";

export class $Camera extends $GameObject {
  static Type = "Camera";
  canvas: HTMLCanvasElement;
  canvasCtx: CanvasRenderingContext2D;
  projecion: Matrix;

  constructor(name: string, public width: number, public height: number) {
    super(name);
    this.type = $Camera.Type;
    this.isRootObject = true;
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvasCtx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.projecion = new Matrix();
    this.events();
  }

  cameraIsUpdated() {
    this.wasUpdated = true;
  }

  connectRoot(root: $Root) {
    registerEvents(
      root.glovalContext,
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
