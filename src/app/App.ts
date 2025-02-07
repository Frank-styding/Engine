import { $Scene } from "../nodes/$Scene";
import { $Camera } from "../nodes/$Camera";
import { init, update, updateTransforms } from "../nodes/methods";

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
  stop: boolean;

  mainCamera: $Camera;

  constructor(public config: AppConfig = defaultConfig) {
    this.scenes = {};
    this.currentScene = undefined;
    this.stop = false;

    this.mainCamera = new $Camera("main");
  }

  addToDom() {
    const canvasContainer = document.getElementById(
      this.config.canvasContainer
    );
    if (!canvasContainer) return;
    canvasContainer.appendChild(this.mainCamera.canvas.canvas);
  }

  updateSizeCamera() {
    const width = (this.config.mainCamera?.width || 1) * innerWidth;
    const height = (this.config.mainCamera?.height || 1) * innerHeight;
    this.mainCamera.canvas.setSize(width, height);
  }

  draw() {}

  addScene(scene: $Scene) {
    this.scenes[scene.name] = scene;
  }

  connectToCameras() {
    if (!this.currentScene) return;
    //!this.mainCamera.connectScene(this.currentScene);
  }

  connectToComponents() {
    if (!this.currentScene) return;
    this.currentScene.context.registerApp(this);
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
    init(this.currentScene);
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
    if (this.stop) return;
    updateTransforms(this.currentScene);
    update(t, this.currentScene);
    //! $Camera.draw(this.mainCamera, this.currentScene);
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
