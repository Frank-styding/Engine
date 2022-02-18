import { gl } from "./InitWebGl.js";

export class Buffer {
  /**
   *
   * @param {ArrayBuffer} data
   * @param {number} dataSize
   */
  constructor(data, dataSize, normalize = false) {
    this.data = data;
    this.dataSize = dataSize;
    this.normalize = normalize;
    this.target = gl.ARRAY_BUFFER;
    this.usage = gl.STATIC_DRAW;
    this.type = this.getDataType();
    this.loadBuffer();
  }

  loadBuffer() {
    this.buffer = gl.createBuffer();
    gl.bindBuffer(this.target, this.buffer);
    gl.bufferData(this.target, this.data, this.usage);
  }

  /**
   *
   * @param {number} dataSize
   */
  setDataSize(dataSize) {
    this.dataSize = dataSize;
    this.loadBuffer();
    return this;
  }

  /**
   *
   * @param {number} usage
   */
  setUsage(usage) {
    this.usage = usage;
    this.loadBuffer();
    return this;
  }

  /**
   *
   * @param {number} target
   */
  setTarget(target) {
    this.target = target;
    this.loadBuffer();
    return this;
  }

  /**
   *
   * @param {ArrayBuffer} data
   * @returns
   */
  getDataType() {
    if (this.data instanceof Float32Array) {
      return gl.FLOAT;
    } else if (this.data instanceof Uint16Array) {
      return gl.UNSIGNED_SHORT;
    } else if (this.data instanceof Int16Array) {
      return gl.SHORT;
    } else if (this.data instanceof Uint32Array) {
      return gl.UNSIGNED_INT;
    } else if (this.data instanceof Int8Array) {
      return gl.BYTE;
    } else if (this.data instanceof Uint8Array) {
      return gl.UNSIGNED_BYTE;
    } else if (this.data instanceof Uint8ClampedArray) {
      return gl.UNSIGNED_BYTE;
    }
  }

  bind() {
    gl.bindBuffer(this.target, this.buffer);
  }

  unBind() {
    gl.bindBuffer(this.target, null);
  }
}
