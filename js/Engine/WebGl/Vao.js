import { gl } from "./InitWebGl.js";
import { Buffer } from "./Buffer.js";

/* export class Vao { */
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
export class Vao {
  /**
   *
   * @typedef {Object} attribute
   * @property {Buffer} buffer
   * @property {number|null|undefined} location
   */

  /**
   *
   * @param {Object.<string,attribute>} attributes
   */
  constructor(attributes = {}) {
    this.attributes = attributes;
    this.vao = undefined;
    this.elementCount = 0;
    this.hasElementBuffer = false;
    this.loadAttributes();
  }

  setAttribute(name, buffer, location) {
    this.attributes[name] = { buffer: buffer, location };
  }

  loadAttributes() {
    this.createVao();
    this.bind();
    for (let attributeName in this.attributes) {
      let attribute = this.attributes[attributeName];

      if (attribute.buffer.target == gl.ELEMENT_ARRAY_BUFFER) {
        this.elementCount = attribute.buffer.data.length;
        this.hasElementBuffer = true;
      }

      if (!this.hasElementBuffer) {
        this.elementCount = Math.max(
          this.elementCount,
          attribute.buffer.data.length / attribute.buffer.dataSize
        );
      }

      attribute.buffer.bind();

      if (attribute.location != undefined && attribute.location != null) {
        gl.enableVertexAttribArray(attribute.location);
        gl.vertexAttribPointer(
          attribute.location,
          attribute.buffer.dataSize,
          attribute.buffer.type,
          attribute.buffer.normalize,
          0,
          0
        );
      }
    }
  }

  createVao() {
    this.vao = gl.createVertexArray();
  }

  bind() {
    if (this.vao) {
      gl.bindVertexArray(this.vao);
    }
  }
  unBind() {
    gl.bindVertexArray(null);
  }

  render({ primitiveType, offset } = {}) {
    if (this.hasElementBuffer) {
      gl.drawElements(
        primitiveType ?? gl.TRIANGLES,
        this.elementCount,
        gl.UNSIGNED_SHORT,
        offset ?? 0
      );
    }
    gl.drawArrays(primitiveType ?? gl.TRIANGLES, 0, this.elementCount);
  }
}
