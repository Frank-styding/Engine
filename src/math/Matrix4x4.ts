import { generateUUID } from "../utils/generateUUID";
import { Vector2 } from "./Vector2";

type IData = [number, number, number, number, number, number];
export class Matrix4x4 {
  private data: IData = [1, 0, 0, 0, 1, 0];
  private id: string;

  constructor(data?: IData) {
    if (data) this.data = data;
    this.id = generateUUID();
  }

  mul(m: Matrix4x4): Matrix4x4 {
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

    return this;
  }

  leftMul(m: Matrix4x4) {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = m.data[0] * this.data[0] + m.data[1] * this.data[3];
    data[1] = m.data[0] * this.data[1] + m.data[1] * this.data[4];
    data[2] = m.data[0] * this.data[2] + m.data[1] * this.data[5] + m.data[2];

    data[3] = m.data[3] * this.data[0] + m.data[4] * this.data[3];
    data[4] = m.data[3] * this.data[1] + m.data[4] * this.data[4];
    data[5] = m.data[3] * this.data[2] + m.data[4] * this.data[5] + m.data[5];
    this.data = data;
    return this;
  }

  rotate(a: number): Matrix4x4 {
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
    return this;
  }

  scale(sx: number, sy: number): Matrix4x4 {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0] * sx;
    data[1] = this.data[1] * sy;
    data[2] = this.data[2];
    data[3] = this.data[3] * sx;
    data[4] = this.data[4] * sy;
    data[5] = this.data[5];
    this.data = data;
    return this;
  }

  translate(x: number, y: number): Matrix4x4 {
    const data: IData = [1, 0, 0, 0, 1, 0];
    data[0] = this.data[0];
    data[1] = this.data[1];
    data[2] = this.data[0] * x + this.data[1] * y + this.data[2];

    data[3] = this.data[3];
    data[4] = this.data[4];
    data[5] = this.data[3] * x + this.data[4] * y + this.data[5];
    this.data = data;
    return this;
  }

  det(): number {
    return this.data[4] * this.data[0] - this.data[1] * this.data[3];
  }

  inv(): Matrix4x4 {
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

  clone(): Matrix4x4 {
    return new Matrix4x4([...this.data]);
  }

  copy(m: Matrix4x4): Matrix4x4 {
    this.data[0] = m.data[0];
    this.data[1] = m.data[1];
    this.data[2] = m.data[2];
    this.data[3] = m.data[3];
    this.data[4] = m.data[4];
    this.data[5] = m.data[5];
    return this;
  }

  mulV(v: Vector2): Vector2 {
    return new Vector2(
      this.data[0] * v.x + this.data[1] * v.y + this.data[2],
      this.data[3] * v.x + this.data[4] * v.y + this.data[5]
    );
  }

  equal(m: Matrix4x4) {
    return (
      this.data[0] == m.data[0] &&
      this.data[1] == m.data[1] &&
      this.data[2] == m.data[2] &&
      this.data[3] == m.data[3] &&
      this.data[4] == m.data[4] &&
      this.data[5] == m.data[5]
    );
  }
}
