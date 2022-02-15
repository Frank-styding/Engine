import { Vec2 } from "./Vec2.js";

export class Vec3 {
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   */
  constructor(x, y = undefined, z = undefined) {
    this.x = Vec3.getX(x, y, z);
    this.y = Vec3.getY(x, y, z);
    this.z = Vec3.getZ(x, y, z);
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   */
  static getX(x, y, z) {
    if (x instanceof Vec3) {
      return x.x;
    }
    if (x instanceof Vec2) {
      return x.x;
    }
    return x;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   */
  static getY(x, y, z) {
    if (x instanceof Vec3) {
      return x.y;
    }
    if (x instanceof Vec2) {
      return x.y;
    }
    if (y == undefined) {
      return x;
    }
    return y;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   */
  static getZ(x, y, z) {
    if (x instanceof Vec3) {
      return x.z;
    }
    if (x instanceof Vec2) {
      if (y == undefined) {
        return 0;
      }
      return y;
    }

    if (y != undefined && z == undefined) {
      return 0;
    }

    if (z == undefined) {
      return x;
    }

    return z;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   * @returns {Vec3}
   */
  add(x, y = undefined, z = undefined) {
    let _x = Vec3.getX(x, y, z);
    let _y = Vec3.getY(x, y, z);
    let _z = Vec3.getZ(x, y, z);
    this.x += _x;
    this.y += _y;
    this.z += _z;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   * @returns {Vec3}
   */
  sub(x, y = undefined, z = undefined) {
    let _x = Vec3.getX(x, y, z);
    let _y = Vec3.getY(x, y, z);
    let _z = Vec3.getZ(x, y, z);
    this.x -= _x;
    this.y -= _y;
    this.z -= _z;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   * @returns {Vec3}
   */
  mul(x, y = undefined, z = undefined) {
    let _x = Vec3.getX(x, y, z);
    let _y = Vec3.getY(x, y, z);
    let _z = Vec3.getZ(x, y, z);
    this.x *= _x;
    this.y *= _y;
    this.z *= _z;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @param {undefined|number} z
   * @returns {Vec3}
   */
  div(x, y = undefined, z = undefined) {
    let _x = Vec3.getX(x, y, z);
    let _y = Vec3.getY(x, y, z);
    let _z = Vec3.getZ(x, y, z);
    this.x *= _x;
    this.y *= _y;
    this.z *= _z;
    return this;
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  lengthSqrt() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   *
   * @param {Vec3} v
   * @returns {number}
   */
  dot(v) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
}
