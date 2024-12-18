import { Vector } from "./Vector";

type IData = [number, number, number, number, number, number];
export class Matrix {
  private data: IData = [1, 0, 0, 0, 1, 0];
  protected methodCalled(): void {}

  constructor(data?: IData) {
    if (data) this.data = data;
  }

  mul(m: Matrix): Matrix {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0] * m.data[0] + this.data[1] * m.data[3];
    data[1] = this.data[0] * m.data[1] + this.data[1] * m.data[4];
    data[2] =
      this.data[0] * m.data[2] + this.data[1] * m.data[5] + this.data[2];

    data[3] = this.data[3] * m.data[0] + this.data[4] * m.data[3];
    data[4] = this.data[3] * m.data[1] + this.data[4] * m.data[4];
    data[5] =
      this.data[3] * m.data[2] + this.data[4] * m.data[5] + this.data[5];
    this.data = data;
    this.methodCalled();
    return this;
  }

  leftMul(m: Matrix) {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = m.data[0] * this.data[0] + m.data[1] * this.data[3];
    data[1] = m.data[0] * this.data[1] + m.data[1] * this.data[4];
    data[2] = m.data[0] * this.data[2] + m.data[1] * this.data[5] + m.data[2];

    data[3] = m.data[3] * this.data[0] + m.data[4] * this.data[3];
    data[4] = m.data[3] * this.data[1] + m.data[4] * this.data[4];
    data[5] = m.data[3] * this.data[2] + m.data[4] * this.data[5] + m.data[5];
    this.data = data;
    this.methodCalled();

    return this;
  }

  rotate(a: number): Matrix {
    const c = Math.cos(a);
    const s = Math.sin(a);
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0] * c + this.data[1] * s;
    data[1] = this.data[0] * -s + this.data[1] * c;
    data[2] = this.data[2];
    data[3] = this.data[3] * c + this.data[4] * s;
    data[4] = this.data[3] * -s + this.data[4] * c;
    data[5] = this.data[5];
    this.data = data;
    this.methodCalled();

    return this;
  }

  scale(sx: number, sy: number): Matrix {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0] * sx;
    data[1] = this.data[1] * sy;
    data[2] = this.data[2];
    data[3] = this.data[3] * sx;
    data[4] = this.data[4] * sy;
    data[5] = this.data[5];
    this.data = data;
    this.methodCalled();

    return this;
  }

  translate(x: number, y: number): Matrix {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0];
    data[1] = this.data[1];
    data[2] = this.data[0] * x + this.data[1] * y + this.data[2];

    data[3] = this.data[3];
    data[4] = this.data[4];
    data[5] = this.data[3] * x + this.data[4] * y + this.data[5];
    this.data = data;
    this.methodCalled();

    return this;
  }

  setPosition(v: Vector) {
    this.data[2] = v.x;
    this.data[5] = v.y;
    this.methodCalled();

    return this;
  }

  det(): number {
    return this.data[4] * this.data[0] - this.data[1] * this.data[3];
  }

  inv(): Matrix {
    let det = this.det();
    this.data = [
      this.data[4] / det,
      -this.data[1] / det,
      (this.data[1] * this.data[5] - this.data[4] * this.data[2]) / det,
      -this.data[3] / det,
      this.data[0] / det,
      (this.data[2] * this.data[3] - this.data[0] * this.data[5]) / det,
    ];

    return this;
  }

  clone(): Matrix {
    return new Matrix([...this.data]);
  }

  copy(m: Matrix): Matrix {
    this.data[0] = m.data[0];
    this.data[1] = m.data[1];
    this.data[2] = m.data[2];
    this.data[3] = m.data[3];
    this.data[4] = m.data[4];
    this.data[5] = m.data[5];
    this.methodCalled();
    return this;
  }

  mulV(v: Vector): Vector {
    return new Vector(
      this.data[0] * v.x + this.data[1] * v.y + this.data[2],
      this.data[3] * v.x + this.data[4] * v.y + this.data[5]
    );
  }

  equal(m: Matrix) {
    return (
      this.data[0] == m.data[0] &&
      this.data[1] == m.data[1] &&
      this.data[2] == m.data[2] &&
      this.data[3] == m.data[3] &&
      this.data[4] == m.data[4] &&
      this.data[5] == m.data[5]
    );
  }
  applyToCanvasCtx(ctx: CanvasRenderingContext2D) {
    ctx.transform(
      this.data[0],
      this.data[3],
      this.data[1],
      this.data[4],
      this.data[2],
      this.data[5]
    );
  }
}
