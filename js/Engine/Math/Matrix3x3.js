export class Matrix3x3 {
  /**
   *
   * @param {number[]} data
   */
  constructor(data = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
    this.data = data;
  }

  /**
   *
   * @param {Matrix3x3} m
   * @returns {Matrix3x3}
   */
  mul(m) {
    this.data = Matrix3x3.mul(this, m).data;
    return this;
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Matrix3x3}
   */
  translate(x, y) {
    return this.mul(Matrix3x3.translate(x, y));
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Matrix3x3}
   */
  scale(x, y) {
    return this.mul(Matrix3x3.scale(x, y));
  }

  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  rotateX(angle) {
    return this.mul(Matrix3x3.rotateX(angle));
  }
  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  rotateY(angle) {
    return this.mul(Matrix3x3.rotateY(angle));
  }
  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  rotateZ(angle) {
    return this.mul(Matrix3x3.rotateZ(angle));
  }
  /**
   *
   * @returns {Matrix3x3}
   */
  transpose() {
    return Matrix3x3.transpose(this).data;
  }
  /**
   *
   * @returns {number}
   */
  det() {
    return Matrix3x3.det(this);
  }
  /**
   *
   * @returns {Matrix3x3}
   */
  adj() {
    return Matrix3x3.adj(this);
  }
  /**
   *
   * @returns {Matrix3x3}
   */
  inverse() {
    return Matrix3x3.inverse(this);
  }

  /**
   *
   * @param {Matrix3x3} m
   * @param {Matrix3x3} m1
   * @returns {Matrix3x3}
   */
  static mul(m, m1) {
    let d = m.data;
    let d1 = m1.data;
    let d2 = new Array(9).fill(0);

    d2[0] = d[0] * d1[0] + d[1] * d1[3] + d[2] * d1[6];
    d2[1] = d[0] * d1[1] + d[1] * d1[4] + d[2] * d1[7];
    d2[2] = d[0] * d1[2] + d[1] * d1[5] + d[2] * d1[8];

    d2[3] = d[3] * d1[0] + d[4] * d1[3] + d[5] * d1[6];
    d2[4] = d[3] * d1[1] + d[4] * d1[4] + d[5] * d1[7];
    d2[5] = d[3] * d1[2] + d[4] * d1[5] + d[5] * d1[8];

    d2[6] = d[6] * d1[0] + d[7] * d1[3] + d[8] * d1[6];
    d2[7] = d[6] * d1[1] + d[7] * d1[4] + d[8] * d1[7];
    d2[8] = d[6] * d1[2] + d[7] * d1[5] + d[8] * d1[8];

    return new Matrix3x3(d2);
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Matrix3x3}
   */
  static translate(x, y) {
    return new Matrix3x3([1, 0, x, 0, 1, y, 0, 0, 1]);
  }
  /**
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Matrix3x3}
   */
  static scale(x, y, z = 1) {
    return new Matrix3x3([x, 0, 0, 0, y, 0, 0, 0, z]);
  }
  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  static rotateX(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([1, 0, 0, 0, c, -s, 0, s, c]);
  }
  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  static rotateY(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([c, 0, s, 0, 1, 0, -s, 0, c]);
  }
  /**
   *
   * @param {number} angle
   * @returns  {Matrix3x3}
   */
  static rotateZ(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([c, -s, 0, s, c, 0, 0, 0, 1]);
  }
  /**
   *
   * @param {Matrix3x3} m
   * @returns {Matrix3x3}
   */
  static transpose(m) {
    let d = m.data;
    return new Matrix3x3([
      d[0],
      d[3],
      d[6],
      d[1],
      d[4],
      d[7],
      d[2],
      d[5],
      d[8],
    ]);
  }
  /**
   *
   * @param {Matrix3x3} m
   * @returns {number}
   */
  static det(m) {
    let d = m.data;
    return (
      d[0] * (d[4] * d[8] - d[5] * d[7]) -
      d[1] * (d[3] * d[8] - d[5] * d[6]) +
      d[2] * (d[3] * d[7] - d[4] * d[6])
    );
  }
  /**
   *
   * @param {Matrix3x3} m
   * @returns {Matrix3x3}
   */
  static adj(m) {
    let d = m.data;

    return new Matrix3x3([
      d[4] * d[8] - d[5] * d[7],
      -(d[3] * d[8] - d[6] * d[5]),
      d[3] * d[7] - d[4] * d[6],

      -(d[1] * d[8] - d[7] * d[2]),
      d[0] * d[8] - d[6] * d[2],
      -(d[0] * d[7] - d[1] * d[6]),

      d[1] * d[5] - d[2] * d[4],
      -(d[0] * d[5] - d[2] * d[3]),
      d[0] * d[4] - d[1] * d[3],
    ]);
  }
  /**
   *
   * @param {Matrix3x3} m
   * @returns  {Matrix3x3}
   */
  static inverse(m) {
    let adj = Matrix3x3.adj(Matrix3x3.transpose(m)).data;
    let det = Matrix3x3.det(m);
    return new Matrix3x3([
      adj[0] / det,
      adj[1] / det,
      adj[2] / det,
      adj[3] / det,
      adj[4] / det,
      adj[5] / det,
      adj[6] / det,
      adj[7] / det,
      adj[8] / det,
    ]);
  }
}
