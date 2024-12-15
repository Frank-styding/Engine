export class Vector2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  addV(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  add(x: number, y: number): Vector2 {
    this.x += x;
    this.y += y;
    return this;
  }
  addS(s: number) {
    this.x += s;
    this.y += s;
    return this;
  }
  subV(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  sub(x: number, y: number): Vector2 {
    this.x += x;
    this.y += y;
    return this;
  }
  subS(s: number) {
    this.x += s;
    this.y += s;
    return this;
  }
  mulV(v: Vector2): Vector2 {
    this.x += v.x;
    this.y += v.y;
    return this;
  }
  mul(x: number, y: number): Vector2 {
    this.x += x;
    this.y += y;
    return this;
  }
  mulS(s: number) {
    this.x += s;
    this.y += s;
    return this;
  }
  lengthSQRT() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return this;
  }
  dot(v: Vector2) {
    return this.x * v.x + this.y * v.y;
  }
  cross(v: Vector2) {
    return this.x * v.y - this.y * v.x;
  }
  equals(v: Vector2) {
    return this.x == v.x && this.y == v.y;
  }
}
