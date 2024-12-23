import { $Camera } from "./$Camera";
import { $Node } from "./$Node";
import { $Scene } from "./$Scene";

interface AppConfig {
  mainCamera?: {
    width?: number;
    height?: number;
  };
  canvasContainer: string;
}

const defaultConfig: AppConfig = {
  canvasContainer: "rootCanvas",
};
export class App {
  scenes: Record<string, $Scene>;
  currentScene?: $Scene;

  mainCamera: $Camera;

  constructor(public config: AppConfig = defaultConfig) {
    this.scenes = {};
    this.currentScene = undefined;

    this.mainCamera = new $Camera("main");
  }

  addToDom() {
    const canvasContainer = document.getElementById(
      this.config.canvasContainer
    );
    if (!canvasContainer) return;
    canvasContainer.appendChild(this.mainCamera.canvas);
  }

  updateSizeCamera() {
    const width = (this.config.mainCamera?.width || 1) * innerWidth;
    const height = (this.config.mainCamera?.height || 1) * innerHeight;
    this.mainCamera.setSize(width, height);
  }

  draw() {}

  addScene(scene: $Scene) {
    this.scenes[scene.name] = scene;
  }

  connectToCameras() {
    if (!this.currentScene) return;
    this.mainCamera.connectScene(this.currentScene);
  }

  connectToComponents() {
    if (!this.currentScene) return;
    this.currentScene.glovalContext.app = this;
  }

  protected init() {}

  resizeEvent() {
    window.addEventListener("resize", () => {
      this.updateSizeCamera();
    });
  }

  start() {
    if (!this.currentScene) return;
    this.init();
    $Node.init(this.currentScene);
    this.connectToComponents();
    this.connectToCameras();
    this.resizeEvent();
    requestAnimationFrame(this.loop.bind(this));
  }

  update() {}

  private fps: number = 0;
  private startTime: number = 0;
  showFps: boolean = false;

  loop(t: number) {
    if (!this.currentScene) return;
    $Node.updateTransforms(this.currentScene);
    $Node.update(t, this.currentScene);
    $Camera.draw(this.mainCamera, this.currentScene);
    this.update();
    if (this.showFps) {
      const endTime = Date.now();

      this.fps++;

      if (endTime - this.startTime > 1000) {
        console.log("fps: " + this.fps);
        this.fps = 0;
        this.startTime = endTime;
      }
    }
    requestAnimationFrame(this.loop.bind(this));
  }

  setCurrentScene(name: string) {
    this.currentScene = this.scenes[name];
  }
}
