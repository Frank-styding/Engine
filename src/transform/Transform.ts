import { $Node } from "../nodes/$Node";
import { Matrix } from "../math/Matrix";
import { ClassMethods } from "../types/ClassMethods";

export class Transform implements ClassMethods<Transform> {
  private glovalTransform: Matrix = new Matrix();
  private parentTransform: Matrix = new Matrix();

  private model: Matrix = new Matrix();
  private projection: Matrix = new Matrix();

  private prevModel: Matrix = new Matrix();
  private prevProjection: Matrix = new Matrix();

  registerUpdate?: Function;

  copy(t: Transform) {
    this.model.copy(t.model);
    this.projection.copy(t.projection);
    return this;
  }

  clone(): Transform {
    const transform = new Transform();
    transform.copy(this);
    return transform;
  }

  equals(t: Transform): boolean {
    return this.model.equals(t.model) && this.projection.equals(t.projection);
  }

  connectChildren(nodes: $Node[]) {
    for (let node of nodes) {
      node.transform.parentTransform = this.glovalTransform;
    }
  }

  set(callback: (node: { model: Matrix; projection: Matrix }) => void) {
    this.prevModel = this.model.clone();
    this.prevProjection = this.projection.clone();
    callback({ model: this.model, projection: this.projection });
    this.update();
  }

  update() {
    if (
      this.prevModel.equals(this.model) &&
      this.prevProjection.equals(this.projection)
    ) {
      return;
    }

    this.prevModel.copy(this.model);
    this.prevProjection.copy(this.projection);
    const m = this.parentTransform.clone().mul(this.model).mul(this.projection);
    if (!this.glovalTransform.equals(m)) {
      this.glovalTransform.copy(m);
      if (this.registerUpdate) this.registerUpdate();
    }
  }

  getProjection() {
    return this.projection;
  }

  applyGlovalTransform(ctx: CanvasRenderingContext2D) {
    this.glovalTransform.applyToCanvasCtx(ctx);
  }
}
