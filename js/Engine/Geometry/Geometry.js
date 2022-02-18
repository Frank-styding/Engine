/**
 *
 * @param {number} width
 * @param {number} height
 * @param {number} widthSegments
 * @param {number} heightSegments
 */
export function rectGeometry(width, height, widthSegments, heightSegments) {
  let widthSegment = width / widthSegments;
  let heightSegment = height / heightSegments;

  let cords = [];
  let indexs = [];
  let textCords = [];

  for (let j = 0; j <= heightSegments; j++) {
    for (let i = 0; i <= widthSegments; i++) {
      cords.push(
        i * widthSegment - width / 2,
        j * heightSegment - height / 2,
        0
      );
      textCords.push(i / widthSegments, j / heightSegments);
    }
  }

  for (let j = 0; j <= heightSegments - 1; j++) {
    for (let i = 0; i <= widthSegments - 1; i++) {
      indexs.push(
        i + j * (widthSegments + 1),
        i + 1 + j * (widthSegments + 1),
        i + (j + 1) * (widthSegments + 1),
        i + 1 + j * (widthSegments + 1),
        i + (j + 1) * (widthSegments + 1),
        i + 1 + (j + 1) * (widthSegments + 1)
      );
    }
  }

  return { cords, indexs, textCords };
}

/**
 *
 * @param {number[]} cords
 * @param {number[]} indexs
 */
export function lines(cords, indexs) {
  let linesCord = [];
  let lines = [];

  for (let i = 0; i < indexs.length; i += 3) {
    let equals = (a, b) => {
      return a[0] == b[0] && a[1] == b[1];
    };

    if (
      !lines.some((item) => equals(item, [indexs[i], indexs[i + 1]].sort()))
    ) {
      linesCord.push(
        cords[indexs[i] * 3],
        cords[indexs[i] * 3 + 1],
        cords[indexs[i] * 3 + 2],
        cords[indexs[i + 1] * 3],
        cords[indexs[i + 1] * 3 + 1],
        cords[indexs[i + 1] * 3 + 2]
      );
      lines.push([indexs[i], indexs[i + 1]].sort());
    }

    if (
      !lines.some((item) => equals(item, [indexs[i + 1], indexs[i + 2]].sort()))
    ) {
      linesCord.push(
        cords[indexs[i + 1] * 3],
        cords[indexs[i + 1] * 3 + 1],
        cords[indexs[i + 1] * 3 + 2],
        cords[indexs[i + 2] * 3],
        cords[indexs[i + 2] * 3 + 1],
        cords[indexs[i + 2] * 3 + 2]
      );
      lines.push([indexs[i + 1], indexs[i + 2]].sort());
    }
    if (
      !lines.some((item) => equals(item, [indexs[i], indexs[i + 2]].sort()))
    ) {
      linesCord.push(
        cords[indexs[i] * 3],
        cords[indexs[i] * 3 + 1],
        cords[indexs[i] * 3 + 2],
        cords[indexs[i + 2] * 3],
        cords[indexs[i + 2] * 3 + 1],
        cords[indexs[i + 2] * 3 + 2]
      );
      lines.push([indexs[i], indexs[i + 2]].sort());
    }
  }
  return linesCord;
}
