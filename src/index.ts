import { $Camera } from "./$Camera";
import { $Node } from "./$Node";
import { $Root } from "./$Root";

class Rect extends $Node {
  static Type: string = "Rect";
  constructor(name: string, public width: number, public height: number) {
    super(name);
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

camera.connectRoot($root);

/////////

let startTime = Date.now();
let fps = 0;
function loop(t: number) {
  rect1.transform.position.x += 1;
  rect2.transform.position.x += 3;
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

  requestAnimationFrame(loop);
}

/* loop(0);
loop(0);
loop(0); */
//loop(0);
requestAnimationFrame(loop);
//rect1.transform.position.x = 200;
//requestAnimationFrame(loop);
