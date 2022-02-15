import { gl } from "./InitWebGl.js";
import { Buffer } from "./Buffer.js";
import { Program } from "./Program.js";

export class Vao {
  /**
   * @typedef { Object } BufferProps
   * @property {number} target
   * @property {string} dataType
   * @property {number} usage
   */

  /**
   *
   * @typedef { Object } atributeData
   * @property { number } location
   * @property { number[] } data
   * @property { number } dataSize
   * @property { boolean | undefined } normalize,
   * @property { string | undefined }  type
   * @property { string | undefined } name
   * @property { boolean } isVertextBuffer
   * @property { BufferProps | undefined } bufferProps
   */

  /**
   *
   * @param {string} name
   * @param {atributeData[]} attributesData
   */

  constructor(name, attributesData) {
    this.name = name;
    this.attributesData = attributesData;
    this.vao = this.createVao();
    this.attributes = this.createAttributes();
  }

  createVao() {
    let vao = gl.createVertexArray();
    return vao;
  }

  createAttributes() {
    return this.attributesData.map((attributeData) => {
      let location = attributeData.location ?? undefined;
      let type = attributeData.type ?? "float";
      let data = attributeData.data ?? [];
      let normalize = attributeData.normalize ?? false;
      let dataSize = attributeData.dataSize ?? 2;
      let name = attributeData.name ?? "";
      let isVertextBuffer = attributeData.isVertextBuffer ?? false;

      if (isVertextBuffer) {
        this.count = data.length / dataSize;
      }

      let buffer = new Buffer(
        name,
        data,
        type,
        attributeData.bufferProps ?? {}
      );
      return { location, type, data, normalize, dataSize, name, buffer };
    });
  }

  bind() {
    gl.bindVertexArray(this.vao);
  }

  unBind() {
    gl.bindVertexArray(null);
  }

  laodAttributesData() {
    this.bind();
    this.attributes.forEach((attribute) => {
      attribute.buffer.bind();
      gl.enableVertexAttribArray(attribute.location);
      gl.vertexAttribPointer(
        attribute.location,
        attribute.dataSize,
        attribute.type == "float" ? gl.FLOAT : gl.INT,
        attribute.normalize,
        0,
        0
      );
      attribute.buffer.unBind();
    });
  }

  render({ offset, primitiveType } = {}) {
    gl.drawArrays(primitiveType ?? gl.TRIANGLES, offset ?? 0, this.count);
  }
}
