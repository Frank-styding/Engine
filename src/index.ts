import { $Node } from "./$Node";
import { $Scene } from "./$Scene";
import { App } from "./App";

class Rect extends $Node {
  constructor(
    name: string,
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {
    super(`rect_${name}`);
  }

  initLayout(): void {
    this.transform.position.x += this.x;
    this.transform.position.y += this.y;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.width, this.height);
  }
}

class Game extends App {
  elements: Rect[];
  constructor() {
    super();
    this.addScene(new $Scene("main"));
    this.setCurrentScene("main");
    this.elements = [];
    this.showFps = true;
    for (let i = 0; i < 2; i++) {
      this.elements.push(new Rect(`rect+${i}`, 100, 100 * i, 200, 50));
    }
  }

  init(): void {
    if (!this.currentScene) return;
    for (let element of this.elements) {
      this.currentScene.addChild(element);
    }
  }
  count = 0;
  update(): void {
    for (let element of this.elements) {
      element.transform.position.x += 10;
      console.log(element.transform.glovalTransform.clone());
    }
    if (this.count > 20) {
      this.stop = true;
    }
    this.count++;
  }
}

const game = new Game();
game.addToDom();
game.updateSizeCamera();
game.start();
