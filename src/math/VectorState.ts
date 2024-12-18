import { Vector } from "./Vector";

export class VectorState extends Vector {
  private memory: Vector = new Vector();
  isUpdated: boolean = false;
  updateCallback?: Function;

  protected methodCalled(): void {
    if (!this.memory.equal(this)) {
      this.isUpdated = false;
      if (this.updateCallback) this.updateCallback();
    }
  }

  update() {
    if (!this.isUpdated) {
      this.memory.copy(this);
      this.isUpdated = true;
    }
  }
}
