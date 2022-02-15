export class Matrix2x2 {
  constructor(data = [1, 0, 0, 1]) {
    this.data = data ?? [];
  }

  mul(m) {
    let data = Matrix2x2.mul(this, m);
    this.data = data;
    return this;
  }
  scale(x, y) {
    this.mul(Matrix2x2.scale(x, y));
    return this;
  }

  rotate(angle) {
    this.mul(Matrix2x2.rotate(angle));
    return this;
  }

  static mul(m, m1) {
    let d = m.data;
    let d1 = m1.data;
    let d2 = new Array(4).fill(0);

    d2[0] = d[0] * d1[0] + d[1] * d[2];
    d2[1] = d[0] * d1[1] + d[1] * d[3];
    d2[2] = d[2] * d1[0] + d[3] * d[2];
    d2[3] = d[2] * d1[1] + d[3] * d[3];
    return new Matrix2x2(d2);
  }
  static scale(x, y) {
    return new Matrix2x2([x, 0, 0, y]);
  }
  static rotate(angle) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    return new Matrix2x2([c, -s, s, c]);
  }
  static transpose(m) {
    let d = m.data;
    return new Matrix2x2([d[0], d[2], d[1], d[3]]);
  }
  static det(m) {
    let d = m.data;
    return d[0] * d[3] - d[1] * d[2];
  }
  static inverse(m) {
    let det = Matrix2x2.det(m);
    let d = m.data;
    return new Matrix2x2([d[3] / det, -d[1] / det, -d[2] / det, d[0] / det]);
  }
}
