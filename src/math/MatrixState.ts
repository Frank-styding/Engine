import { Matrix } from "./Matrix";

export class MatrixState extends Matrix {
  private memory: Matrix = new Matrix();
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
