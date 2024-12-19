import { $Camera } from "./$Camera";
import { $CanvasArea } from "./$CanvasArea";
import { $Node } from "./$Node";
import { $Root } from "./$Root";
/* 
class Rect extends $Node {
  static Type: string = "Rect";
  constructor(name: string, public width: number, public height: number) {
    super(name);
  }
  update(t: number): void {
    this.wasUpdated = false;
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}

const rect0 = new Rect("rect0", 100, 100);
const rect1 = new Rect("rect1", 100, 100);
const rect2 = new Rect("rect2", 100, 100);
const rect3 = new Rect("rect3", 100, 100);
const rect4 = new Rect("rect4", 100, 100);

const $root = new $Root("root");

const camera = new $Camera("Camera", innerWidth, innerHeight);

const appElement = document.getElementById("app");
appElement?.appendChild(camera.canvas);

$root.addChild(rect0);
$root.addChild(rect1);
$root.addChild(rect2);
$Node.init($root);

camera.connectRoot($root); */

class Button extends $CanvasArea {
  initLayout(): void {
    this.addChild(new $Label(this.name + "_label"));
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.restore();
  }
}

class $Label extends $CanvasArea {
  constructor(name: string) {
    super(name, 0, 0);
    this.width = 50;
    this.height = 20;
    this.setCanvasSize();
  }
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.font = "sans-serif 30px";
    ctx.fillText("hola", this.width / 2 - 30, this.height / 2);
  }
}

/* const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100);
const button = new Button("button0", 200, 100); */

//////////////
const $root = new $Root("root");
const camera = new $Camera("Camera", innerWidth, innerHeight);
camera.connectRoot($root);
const appElement = document.getElementById("app");
appElement?.appendChild(camera.canvas);
/////////////

const buttons: Button[] = [];

for (let i = 0; i < 1000; i++) {
  const button = new Button("button" + i, 200, 100);
  button.transform.position.y = i * 20;
  $root.addChild(button);
  buttons.push(button);
}
//////////////
$Node.init($root);
camera.connectRoot($root);

let startTime = Date.now();
let fps = 0;
/* function loop(t: number) {
  ///////////
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if (button.transform.position.x < 500) {
      button.transform.position.x += 1;
    }
  }
  ///////////////
  $Node.updateTransforms($root);
  $Node.update(0, $root);
  $Camera.draw(camera, $root);

  let endTime = Date.now();
  fps++;
  if (endTime - startTime > 1000) {
    console.log("fps: " + fps);
    fps = 0;
    startTime = endTime;
  }
  //////////////
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);
 */
