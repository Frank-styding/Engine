import { ClassMethods } from "../types/ClassMethods";
import { Vector } from "./Vector";

type Data = [number, number, number, number, number, number];
export class Matrix implements ClassMethods<Matrix> {
  constructor(public data: Data = [1, 0, 0, 0, 1, 0]) {
    this.position.updatedCallback = () => {
      this.setPosition(this.position, false);
    };
  }

  updatedCallback?: () => void;

  _updatedCallback() {
    this.position.copy(this.getTranslation());
    if (this.updatedCallback) this.updatedCallback();
  }

  position: Vector = new Vector();

  mul(m: Matrix) {
    const d: Data = [1, 0, 0, 0, 1, 0];
    const d0 = this.data;
    const d1 = m.data;
    d[0] = d0[0] * d1[0] + d0[1] * d1[3];
    d[1] = d0[0] * d1[1] + d0[1] * d1[4];
    d[2] = d0[0] * d1[2] + d0[1] * d1[5] + d0[2];
    d[3] = d0[3] * d1[0] + d0[4] * d1[3];
    d[4] = d0[3] * d1[1] + d0[4] * d1[4];
    d[5] = d0[3] * d1[2] + d0[4] * d1[5] + d0[5];
    this.data = d;
    if (this._updatedCallback) this._updatedCallback();

    return this;
  }

  leftMul(m: Matrix) {
    const d: Data = [1, 0, 0, 0, 1, 0];
    const d0 = m.data;
    const d1 = this.data;
    d[0] = d0[0] * d1[0] + d0[1] * d1[3];
    d[1] = d0[0] * d1[1] + d0[1] * d1[4];
    d[2] = d0[0] * d1[2] + d0[1] * d1[5] + d0[2];
    d[3] = d0[3] * d1[0] + d0[4] * d1[3];
    d[4] = d0[3] * d1[1] + d0[4] * d1[4];
    d[5] = d0[3] * d1[2] + d0[4] * d1[5] + d0[5];
    this.data = d;
    if (this._updatedCallback) this._updatedCallback();

    return this;
  }

  rotate(a: number) {
    const c = Math.cos(a);
    const s = Math.sin(a);
    const d: Data = [1, 0, 0, 0, 1, 0];
    const d0 = this.data;
    d[0] = d0[0] * c + d0[1] * s;
    d[1] = d0[0] * -s + d0[1] * c;
    d[2] = d0[2];
    d[3] = d0[3] * c + d0[4] * s;
    d[4] = d0[3] * -s + d0[4] * c;
    d[5] = d0[5];
    this.data = d;
    if (this._updatedCallback) this._updatedCallback();

    return this;
  }

  scale(sx: number, sy: number) {
    const d: Data = [1, 0, 0, 0, 1, 0];
    const d0 = this.data;
    d[0] = d0[0] * sx;
    d[1] = d0[1] * sy;
    d[2] = d0[2];
    d[3] = d0[3] * sx;
    d[4] = d0[4] * sy;
    d[5] = d0[5];
    this.data = d;
    if (this._updatedCallback) this._updatedCallback();

    return this;
  }

  translate(x: number, y: number) {
    const d: Data = [1, 0, 0, 0, 1, 0];
    const d0 = this.data;
    d[0] = d0[0];
    d[1] = d0[1];
    d[2] = d0[0] * x + d0[1] * y + d0[2];
    d[3] = d0[3];
    d[4] = d0[4];
    d[5] = d0[3] * x + d0[4] * y + d0[5];
    this.data = d;
    if (this._updatedCallback) this._updatedCallback();
    return this;
  }

  det() {
    const d0 = this.data;
    return d0[4] * d0[0] - d0[1] * d0[3];
  }

  inv() {
    let det = this.det();
    const d0 = this.data;
    const d: Data = [
      d0[4] / det,
      -d0[1] / det,
      (d0[1] * d0[5] - d0[4] * d0[2]) / det,
      -d0[3] / det,
      d0[0] / det,
      (d0[2] * d0[3] - d0[0] * d0[5]) / det,
    ];
    return new Matrix(d);
  }

  clone() {
    return new Matrix([...this.data]);
  }

  copy(m: Matrix, callUpdate: boolean = true) {
    const d = this.data;
    d[0] = m.data[0];
    d[1] = m.data[1];
    d[2] = m.data[2];
    d[3] = m.data[3];
    d[4] = m.data[4];
    d[5] = m.data[5];
    if (callUpdate && this._updatedCallback) this._updatedCallback();
    return this;
  }

  equals(m: Matrix) {
    const d = this.data;
    const d0 = m.data;
    return (
      d[0] == d0[0] &&
      d[1] == d0[1] &&
      d[2] == d0[2] &&
      d[3] == d0[3] &&
      d[4] == d0[4] &&
      d[5] == d0[5]
    );
  }

  applyToCanvasCtx(ctx: CanvasRenderingContext2D) {
    const d = this.data;
    ctx.transform(d[0], d[3], d[1], d[4], d[2], d[5]);
  }

  getTranslation() {
    return new Vector(this.data[2], this.data[5]);
  }

  setPosition(v: Vector, callUpdate: boolean = true) {
    this.data[2] = v.x;
    this.data[5] = v.y;
    if (callUpdate && this._updatedCallback) this._updatedCallback();
    return this;
  }
}
