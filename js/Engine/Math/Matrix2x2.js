export class Matrix2x2 {
  constructor(data = [1, 0, 0, 1]) {
    this.data = data ?? [];
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
}
