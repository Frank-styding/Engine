import { Transform } from "../transform/Transform";
import { $NodeBase } from "./$NodeBase";

export class $Node extends $NodeBase {
  static readonly type: string = "Node";
  type: string = $Node.type;
  children: $Node[] = [];
  transform: Transform = new Transform();
  layerIdx: number = 0;

  constructor(name: string) {
    super(name);
    this.transform.registerUpdate = () => {
      this.context.registerUpdatedTransform(this);
    };
  }

  initLayout() {}
  draw(ctx: CanvasRenderingContext2D) {}

  protected _ready(): void {
    this.initLayout();
    this.ready();
  }

  protected _reverseInit(): void {
    this.reverseInit();
    this.transform.connectChildren(this.children);
  }
}
