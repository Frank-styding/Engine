import { $GameObject } from "./$GameObject";
import { GameObjectType } from "../types/GameObjectType";
import { Transform } from "./Transform";
import { ID } from "src/types/ID";
import { Context } from "src/types/Context";

type $NodeContext = {
  updatedNodeTransforms: Set<ID>;
};

export class $Node extends $GameObject<$NodeContext> {
  static Type: GameObjectType = "Node";
  public transform: Transform;
  public children: $Node[];

  constructor(name: string) {
    super(name, $Node.Type);
    this.transform = new Transform();
    this.children = [];
    this.context["updatedNodeTransforms"] = new Set();
  }

  initLayout() {}

  draw(ctx: CanvasRenderingContext2D) {}

  updateTransform() {
    this.context.updatedNodeTransforms.add(this.id);
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

  static updateTransform(object: $GameObject): void {
    const updatedNodeTransforms = (object.context as Context<$NodeContext>)
      .updatedNodeTransforms;
    const baseNodes = Array.from(updatedNodeTransforms);
    for (let i = 0; i < baseNodes.length; i++) {
      const node = $GameObject.objects[baseNodes[i]] as $Node;
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
