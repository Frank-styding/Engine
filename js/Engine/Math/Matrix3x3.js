export class Matrix3x3 {
  constructor(data = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
    this.data = data;
  }

  mul(m) {
    this.data = Matrix3x3.mul(this, m);
    return this;
  }

  translate(x, y) {
    return this.mul(Matrix3x3.translate(x, y));
  }

  scale(x, y) {
    return this.mul(Matrix3x3.scale(x, y));
  }

  rotateX(x, y) {
    return this.mul(Matrix3x3.rotateX(x, y));
  }

  static mul(m, m1) {
    let d = m.data;
    let d1 = m1.data;
    let d2 = new Array(9).fill(0);
    d[0] = d[0] * d1[0] + d[1] * d1[3] + d[2] * d1[6];
    d[1] = d[0] * d1[1] + d[1] * d1[4] + d[2] * d1[7];
    d[2] = d[0] * d1[2] + d[1] * d1[5] + d[2] * d1[8];

    d[3] = d[3] * d1[0] + d[4] * d1[3] + d[5] * d1[6];
    d[4] = d[3] * d1[1] + d[4] * d1[4] + d[5] * d1[7];
    d[5] = d[3] * d1[2] + d[4] * d1[5] + d[5] * d1[8];

    d[6] = d[6] * d1[0] + d[7] * d1[3] + d[8] * d1[6];
    d[7] = d[6] * d1[1] + d[7] * d1[4] + d[8] * d1[7];
    d[8] = d[6] * d1[2] + d[7] * d1[5] + d[8] * d1[8];
  }
  static translate(x, y) {
    return new Matrix3x3([1, 0, x, 0, 1, y, 0, 0, 1]);
  }
  static scale(x, y, z = 1) {
    return new Matrix3x3([x, 0, 0, 0, y, 0, 0, 0, z]);
  }
  static rotateX(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([1, 0, 0, 0, c, -s, 0, s, c]);
  }
  static rotateY(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([c, 0, s, 0, 1, 0, -s, 0, c]);
  }
  static rotateZ(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix3x3([c, -s, 0, s, c, 0, 0, 0, 1]);
  }
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
  static det(m) {
    let d = m.data;
    return (
      d[0] * (d[4] * d[8] - d[5] * d[7]) -
      d[1] * (d[3] * d[8] - d[5] * d[6]) +
      d[2] * (d[3] * d[7] - d[4] * d[6])
    );
  }
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
  static inverse(m) {
    let adj = Matrix3x3.adj(m).data;
    let det = Matrix3x3.det(m).data;
    return Matrix3x3([
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
