import { ClassMethods } from "../types/ClassMethods";

export class Vector implements ClassMethods<Vector> {
  updatedCallback?: () => void;

  constructor(private _x: number = 0, private _y: number = 0) {}

  get x() {
    return this._x;
  }

  set x(value: number) {
    if (this.updatedCallback) this.updatedCallback();
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    if (this.updatedCallback) this.updatedCallback();
    this._y = value;
  }

  addV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  add(x: number, y: number) {
    this._x += x;
    this._y += y;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  addS(s: number) {
    this._x += s;
    this._y += s;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  subV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  sub(x: number, y: number) {
    this._x += x;
    this._y += y;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  subS(s: number) {
    this._x += s;
    this._y += s;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  mulV(v: Vector) {
    this._x += v._x;
    this._y += v._y;
    if (this.updatedCallback) this.updatedCallback();
    return this;
  }
  mul(x: number, y: number) {
    this._x += x;
    this._y += y;
    return this;
  }
  mulS(s: number) {
    this._x += s;
    this._y += s;
    if (this.updatedCallback) this.updatedCallback();
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
  copy(v: Vector, callUpdated: boolean = true) {
    this._x = v._x;
    this._y = v._y;
    if (callUpdated && this.updatedCallback) this.updatedCallback();
    return this;
  }
}
