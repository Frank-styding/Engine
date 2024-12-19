export class Vector {
  private _x: number;
  private _y: number;

  constructor(x: number = 0, y: number = 0) {
    this._x = x;
    this._y = y;
  }

  protected methodCalled(): void {}

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  set x(value: number) {
    this._x = value;
    this.methodCalled();
  }

  set y(value: number) {
    this._y = value;
    this.methodCalled();
  }

  addV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    this.methodCalled();
    return this;
  }
  add(x: number, y: number) {
    this._x += x;
    this._y += y;
    this.methodCalled();

    return this;
  }
  addS(s: number) {
    this._x += s;
    this._y += s;
    this.methodCalled();

    return this;
  }
  subV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    this.methodCalled();

    return this;
  }
  sub(x: number, y: number) {
    this._x += x;
    this._y += y;
    this.methodCalled();

    return this;
  }
  subS(s: number) {
    this._x += s;
    this._y += s;
    this.methodCalled();
    return this;
  }
  mulV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    this.methodCalled();

    return this;
  }
  mul(x: number, y: number) {
    this._x += x;
    this._y += y;
    this.methodCalled();

    return this;
  }
  mulS(s: number) {
    this._x += s;
    this._y += s;
    this.methodCalled();
    return this;
  }
  lengthSQRT(): number {
    return this._x * this._x + this._y * this._y;
  }
  length() {
    return this;
  }
  dot(v: Vector) {
    return this._x * v._x + this._y * v._y;
  }
  cross(v: Vector) {
    return this._x * v._y - this._y * v._x;
  }
  equals(v: Vector) {
    return this._x == v._x && this._y == v._y;
  }

  clone() {
    return new Vector(this._x, this._y);
  }
  copy(v: Vector, callMethod: boolean = true) {
    this._x = v._x;
    this._y = v._y;
    if (callMethod) this.methodCalled();
    return this;
  }
  equal(v: Vector) {
    return this._x == v._x && this._y == v._y;
  }
}
