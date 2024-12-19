import { $Node } from "./$Node";
import { MatrixState } from "./math/MatrixState";
import { VectorState } from "./math/VectorState";

export class Transform {
  public parentTransform: MatrixState = new MatrixState();
  public model: MatrixState = new MatrixState();
  public glovalTransform: MatrixState = new MatrixState();
  public position: VectorState = new VectorState();

  constructor(node: $Node) {
    this.model.updateCallback = () => {
      node.glovalContext.updatedNodeTransforms.add(node.id);
      node.wasUpdated = true;
    };
    this.position.updateCallback = () => {
      this.model.setPosition(this.position);
    };
  }

  update() {
    if (!this.parentTransform.isUpdated || !this.model.isUpdated) {
      this.parentTransform.update();
      this.model.update();
      this.position.copy(this.model.getTranslation(), false);
      const m = this.parentTransform.clone().mul(this.model);
      if (!this.glovalTransform.equal(m)) {
        this.glovalTransform.copy(m);
        return true;
      }
      return false;
    }
  }
}
