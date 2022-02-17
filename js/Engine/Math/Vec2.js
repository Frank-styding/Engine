export class Vec2 {
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   */
  constructor(x, y = undefined) {
    this.x = Vec2.getX(x, y);
    this.y = Vec2.getY(x, y);
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   *
   */
  static getX(x, y) {
    if (x instanceof Vec2) {
      return x.x;
    }
    return x;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   */
  static getY(x, y) {
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
   * @param {number|Vec2} x
   * @param {number|undefined} y
   * @param {number|undefined} z
   * @param {number|undefined} w
   * @returns {Vec2}
   */
  set(x, y = undefined) {
    let _x = Vec2.getX(x, y);
    let _y = Vec2.getY(x, y);
    this.x = _x;
    this.y = _y;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @returns {Vec2}
   */
  add(x, y = undefined) {
    let _x = Vec2.getX(x, y);
    let _y = Vec2.getY(x, y);
    this.x += _x;
    this.y += _y;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @returns {Vec2}
   */
  sub(x, y = undefined) {
    let _x = Vec2.getX(x, y);
    let _y = Vec2.getY(x, y);
    this.x -= _x;
    this.y -= _y;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @returns {Vec2}
   */
  mul(x, y = undefined) {
    let _x = Vec2.getX(x, y);
    let _y = Vec2.getY(x, y);
    this.x *= _x;
    this.y *= _y;
    return this;
  }
  /**
   *
   * @param {Vec2|number} x
   * @param {undefined|number} y
   * @returns {Vec2}
   */
  div(x, y = undefined) {
    let _x = Vec2.getX(x, y);
    let _y = Vec2.getY(x, y);
    this.x /= _x;
    this.y /= _y;
    return this;
  }

  /**
   *
   * @returns {number}
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * @returns {number}
   */
  lengthSqrt() {
    return this.x * this.x + this.y * this.y;
  }

  /**
   *
   * @param {Vec2} v
   * @returns {number}
   */
  dot(v) {
    return this.x * v.x + this.y + v.y;
  }
}
