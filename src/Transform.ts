import { MatrixState } from "./math/MatrixState";
import { VectorState } from "./math/VectorState";

export class Transform {
  public parentTransform: MatrixState = new MatrixState();
  public model: MatrixState = new MatrixState();
  public glovalTransform: MatrixState = new MatrixState();
  public position: VectorState = new VectorState();

  constructor(updateCallback: Function) {
    this.model.updateCallback = updateCallback;
    this.position.updateCallback = () => {
      this.model.setPosition(this.position);
    };
  }

  update() {
    if (!this.parentTransform.isUpdated || !this.model.isUpdated) {
      this.parentTransform.update();
      this.model.update();
      const m = this.parentTransform.clone().mul(this.model);
      if (!this.glovalTransform.equal(m)) {
        this.glovalTransform.copy(m);
        return true;
      }
      return false;
    }
  }
}
