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
   * @property { boolean } isElementBuffer
   */

  /**
   *
   * @param {string} name
   * @param {atributeData[]} attributesData
   */

  constructor(name, attributesData) {
    this.name = name;
    this.attributesData = attributesData;
    this.hasElementBuffer = false;
    this.createVao();
    this.createAttributes();
  }

  createVao() {
    this.vao = gl.createVertexArray();
  }

  createAttributes() {
    this.attributes = this.attributesData.map((attributeData) => {
      let location = attributeData.location ?? undefined;
      let type = attributeData.type ?? "float";
      let data = attributeData.data ?? [];
      let normalize = attributeData.normalize ?? false;
      let dataSize = attributeData.dataSize ?? 2;
      let name = attributeData.name ?? "";
      let isVertextBuffer = attributeData.isVertextBuffer ?? false;
      let isElementBuffer = attributeData.isElementBuffer ?? false;

      if (isVertextBuffer) {
        this.count = data.length / dataSize;
      }

      if (isElementBuffer) {
        this.count = data.length;
        this.hasElementBuffer = true;
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

  loadAttributesData() {
    this.bind();
    this.attributes.forEach((attribute) => {
      attribute.buffer.bind();
      if (attribute.location != undefined) {
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
      }
    });
  }

  render({ offset, primitiveType } = {}) {
    if (this.hasElementBuffer) {
      gl.drawElements(
        primitiveType ?? gl.TRIANGLES,
        this.count,
        gl.UNSIGNED_SHORT,
        offset ?? 0
      );
      return;
    }
    gl.drawArrays(primitiveType ?? gl.TRIANGLES, offset ?? 0, this.count);
  }
}
