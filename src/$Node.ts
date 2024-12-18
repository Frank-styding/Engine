import { $GameObject } from "./$GameObject";
import { Transform } from "./Transform";
import { ID } from "src/types/ID";
import { Context } from "src/types/Context";
import { Box } from "./Box";

type $NodeContext = {
  updatedNodeTransforms: Set<ID>;
};

export class $Node extends $GameObject<$NodeContext> {
  static Type = "Node";
  public transform: Transform;
  public box: Box;
  public children: $Node[];
  public layerIdx: number;

  constructor(name: string) {
    super(name);
    this.type = $Node.Type;
    this.transform = new Transform(this.updateTransform.bind(this));
    this.box = new Box();
    this.children = [];

    this.layerIdx = 0;
    this.context["updatedNodeTransforms"] = new Set();
  }

  initLayout() {}

  draw(ctx: CanvasRenderingContext2D) {}

  private updateTransform() {
    this.context.updatedNodeTransforms.add(this.id);
    this.wasUpdated = true;
  }

  protected _invInit(): void {
    this.invInit();

    // connect the transform of parent and children
    for (let i = 0; i < this.children.length; i++) {
      this.children[i].transform.parentTransform =
        this.transform.glovalTransform;
    }
  }

  protected _init(): void {
    this.initLayout();
    this.init();
  }

  static updateTransforms(object: $GameObject): void {
    const updatedNodeTransforms = (object.context as Context<$NodeContext>)
      .updatedNodeTransforms;
    const baseNodes = Array.from(updatedNodeTransforms);
    for (let i = 0; i < baseNodes.length; i++) {
      const node = $GameObject.objects[baseNodes[i]] as $Node;
      updatedNodeTransforms.delete(baseNodes[i]);
      if (node.transform.update()) {
        const list = [...node.children];
        while (list.length > 0) {
          const subNode = list.shift() as $Node;
          if (subNode.transform.update()) {
            list.push(...subNode.children);
          }
        }
      }
    }
  }
}
