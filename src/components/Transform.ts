import { Matrix4x4 } from "../math/Matrix4x4";

export class Transform {
  public parentTransform: Matrix4x4 = new Matrix4x4();
  public model: Matrix4x4 = new Matrix4x4();
  public glovalTransform: Matrix4x4 = new Matrix4x4();

  update() {
    const m = this.parentTransform.clone().mul(this.model);
    if (!this.glovalTransform.equal(m)) {
      this.glovalTransform.copy(m);
      return true;
    }
    return false;
  }
}
