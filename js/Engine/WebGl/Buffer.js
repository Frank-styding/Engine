import { gl } from "./InitWebGl.js";
export class Buffer {
  /**
   * @typedef { Object } Options
   * @property {number} target
   * @property {string} dataType
   * @property {number} usage
   */

  /**
   *
   * @param {string} name
   * @param {number[]} data
   * @param {number} type
   * @param { Options } param3
   */

  constructor(name, data, type, { target, usage } = {}) {
    this.name = name;
    this.data = data;
    this.target = target ?? gl.ARRAY_BUFFER;
    this.usage = usage ?? gl.STATIC_DRAW;
    this.dataType = type ?? "float";
    this.createBuffer();
  }

  createBuffer() {
    this.convertData();
    let buffer = gl.createBuffer();
    gl.bindBuffer(this.target, buffer);
    gl.bufferData(this.target, this.data, this.usage);
    this.buffer = buffer;
  }

  convertData() {
    switch (this.dataType) {
      case "float":
        this.data = new Float32Array(this.data);
        break;
      case "int":
        this.data = new Int16Array(this.data);
        break;
      case "uint":
        this.data = new Uint16Array(this.data);
        break;
    }
  }

  bind() {
    gl.bindBuffer(this.target, this.buffer);
  }

  unBind() {
    gl.bindBuffer(this.target, null);
  }
}
