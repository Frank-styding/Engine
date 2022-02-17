import { Vec2 } from "./Vec2.js";
import { Vec3 } from "./Vec3.js";

export class Vec4 {
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   */
  constructor(x, y = undefined, z = undefined, w = undefined) {
    this.x = Vec4.getX(x, y, z, w);
    this.y = Vec4.getY(x, y, z, w);
    this.z = Vec4.getZ(x, y, z, w);
    this.w = Vec4.getW(x, y, z, w);
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {number}
   */
  static getX(x, y, z, w) {
    if (x instanceof Vec2 || x instanceof Vec3 || x instanceof Vec4) {
      return x.x;
    }
    return x;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {number}
   */
  static getY(x, y, z, w) {
    if (x instanceof Vec2 || x instanceof Vec3 || x instanceof Vec4) {
      return x.y;
    }
    if (y == undefined) {
      return x;
    }
    return y;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {number}
   */
  static getZ(x, y, z, w) {
    if (x instanceof Vec3 || x instanceof Vec4) {
      return x.z;
    }
    if (x instanceof Vec2) {
      if (y == undefined) {
        return 0;
      }
      return y;
    }
    if (z == undefined) {
      return x;
    }
    return z;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {number}
   */
  static getW(x, y, z, w) {
    if (x instanceof Vec4) {
      return x.w;
    }
    if (x instanceof Vec3) {
      if (y == undefined) {
        return 0;
      }
      return y;
    }
    if (x instanceof Vec2) {
      if (z == undefined) {
        return 0;
      }
      return z;
    }
    if (w == undefined) {
      return x;
    }
    return w;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec4}
   */
  set(x, y = undefined, z = undefined, w = undefined) {
    this.x = Vec4.getX(x, y, z, w);
    this.y = Vec4.getY(x, y, z, w);
    this.z = Vec4.getZ(x, y, z, w);
    this.w = Vec4.getW(x, y, z, w);
    return this;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec4}
   */
  add(x, y = undefined, z = undefined, w = undefined) {
    let _x = Vec4.getX(x, y, z, w);
    let _y = Vec4.getY(x, y, z, w);
    let _z = Vec4.getZ(x, y, z, w);
    let _w = Vec4.getW(x, y, z, w);
    this.x += _x;
    this.y += _y;
    this.z += _z;
    this.w += _w;
    return this;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec4}
   */
  sub(x, y = undefined, z = undefined, w = undefined) {
    let _x = Vec4.getX(x, y, z, w);
    let _y = Vec4.getY(x, y, z, w);
    let _z = Vec4.getZ(x, y, z, w);
    let _w = Vec4.getW(x, y, z, w);
    this.x -= _x;
    this.y -= _y;
    this.z -= _z;
    this.w -= _w;
    return this;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec4}
   */
  mul(x, y = undefined, z = undefined, w = undefined) {
    let _x = Vec4.getX(x, y, z, w);
    let _y = Vec4.getY(x, y, z, w);
    let _z = Vec4.getZ(x, y, z, w);
    let _w = Vec4.getW(x, y, z, w);
    this.x *= _x;
    this.y *= _y;
    this.z *= _z;
    this.w *= _w;
    return this;
  }
  /**
   *
   * @param {x | Vec2 | Vec4 | Vec3} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec4}
   */
  div(x, y = undefined, z = undefined, w = undefined) {
    let _x = Vec4.getX(x, y, z, w);
    let _y = Vec4.getY(x, y, z, w);
    let _z = Vec4.getZ(x, y, z, w);
    let _w = Vec4.getW(x, y, z, w);
    this.x /= _x;
    this.y /= _y;
    this.z /= _z;
    this.w /= _w;
    return this;
  }
  /**
   *
   * @returns {number}
   */
  length() {
    return Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
  /**
   *
   * @returns {number}
   */
  lengthSqrt() {
    return (
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    );
  }
}
