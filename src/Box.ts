import { $Node } from "./$Node";
import { Vector } from "./math/Vector";

export class Box {
  public width: number = 0;
  public height: number = 0;
  constructor(public node: $Node) {}

  mouseIsInside(v: Vector) {
    const center = this.node.transform.glovalTransform.getTranslation();
  }
}
