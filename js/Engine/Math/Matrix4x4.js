export class Matrix4x4 {
  /**
   *
   * @param {number[]} data
   */
  constructor(data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]) {
    this.data = data;
  }
  /**
   *
   * @param {Matrix4x4} m
   * @returns {Matrix4x4}
   */
  mul(m) {
    this.data = Matrix4x4.mul(this, m).data;
    return this;
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix4x4}
   */
  scale(x, y, z) {
    return this.mul(Matrix4x4.scale(x, y, z));
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix4x4}
   */
  translate(x, y, z) {
    return this.mul(Matrix4x4.translate(x, y, z));
  }

  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  rotateX(angle) {
    return this.mul(Matrix4x4.rotateX(angle));
  }
  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  rotateY(angle) {
    return this.mul(Matrix4x4.rotateY(angle));
  }
  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  rotateZ(angle) {
    return this.mul(Matrix4x4.rotateZ(angle));
  }
  /**
   *
   * @returns {Matrix4x4}
   */
  transpose() {
    return Matrix4x4.transpose(this);
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix4x4}
   */
  static translate(x, y, z) {
    return new Matrix4x4([1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix4x4}
   */
  static scale(x, y, z) {
    return new Matrix4x4([x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  static rotateX(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix4x4([1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  static rotateY(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix4x4([c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {number} angle
   * @returns {Matrix4x4}
   */
  static rotateZ(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix4x4([c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {Matrix4x4} m
   * @returns {Matrix4x4}
   */
  static transpose(m) {
    let d = m.data;
    return new Matrix4x4([
      d[0],
      d[4],
      d[8],
      d[12],
      d[1],
      d[5],
      d[9],
      d[13],
      d[2],
      d[6],
      d[10],
      d[14],
      d[3],
      d[7],
      d[11],
      [15],
    ]);
  }
  /**
   *
   * @param {Matrix4x4} m
   * @param {Matrix4x4} m1
   * @returns {Matrix4x4}
   */
  static mul(m, m1) {
    let d = m.data;
    let d1 = m1.data;
    let d2 = new Array(16).fill(0);

    d2[0] = d[0] * d1[0] + d[1] * d1[4] + d[2] * d1[8] + d[3] * d1[12];
    d2[1] = d[0] * d1[1] + d[1] * d1[5] + d[2] * d1[9] + d[3] * d1[13];
    d2[2] = d[0] * d1[2] + d[1] * d1[6] + d[2] * d1[10] + d[3] * d1[14];
    d2[3] = d[0] * d1[3] + d[1] * d1[7] + d[2] * d1[11] + d[3] * d1[15];

    d2[4] = d[4] * d1[0] + d[5] * d1[4] + d[6] * d1[8] + d[7] * d1[12];
    d2[5] = d[4] * d1[1] + d[5] * d1[5] + d[6] * d1[9] + d[7] * d1[13];
    d2[6] = d[4] * d1[2] + d[5] * d1[6] + d[6] * d1[10] + d[7] * d1[14];
    d2[7] = d[4] * d1[3] + d[5] * d1[7] + d[6] * d1[11] + d[7] * d1[15];

    d2[8] = d[8] * d1[0] + d[9] * d1[4] + d[10] * d1[8] + d[11] * d1[12];
    d2[9] = d[8] * d1[1] + d[9] * d1[5] + d[10] * d1[9] + d[11] * d1[13];
    d2[10] = d[8] * d1[2] + d[9] * d1[6] + d[10] * d1[10] + d[11] * d1[14];
    d2[11] = d[8] * d1[3] + d[9] * d1[7] + d[10] * d1[11] + d[11] * d1[15];

    d2[12] = d[12] * d1[0] + d[13] * d1[4] + d[14] * d1[8] + d[15] * d1[12];
    d2[13] = d[12] * d1[1] + d[13] * d1[5] + d[14] * d1[9] + d[15] * d1[13];
    d2[14] = d[12] * d1[2] + d[13] * d1[6] + d[14] * d1[10] + d[15] * d1[14];
    d2[15] = d[12] * d1[3] + d[13] * d1[7] + d[14] * d1[11] + d[15] * d1[15];

    return new Matrix4x4(d2);
  }

  /**
   *
   * @param {number} aspect
   * @param {number} fov
   * @param {number} near
   * @param {number} far
   * @returns  {Matrix4x4}
   */
  static perspective(aspect, fov, near, far) {
    let tan = Math.tan(fov / 2);

    return new Matrix4x4([
      1 / (aspect * tan),
      0,
      0,
      0,
      0,
      1 / tan,
      0,
      0,
      0,
      0,
      -(far + near) / (far - near),
      -(2 * far * near) / (far - near),
      0,
      0,
      -1,
      0,
    ]);
  }

  static orthographic(left, right, top, bottom, far, near) {
    return new Matrix4x4([
      2 / (right - left),
      0,
      0,
      0,
      0,
      2 / (top - bottom),
      0,
      0,
      0,
      0,
      -2 / (far - near),
      0,
      -(right + left) / (right - left),
      -(top + bottom) / (top - bottom),
      -(far + near) / (far - near),
      1,
    ]);
  }
}
