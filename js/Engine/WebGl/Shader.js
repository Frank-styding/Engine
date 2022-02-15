import { gl } from "./InitWebGl.js";

export class Shader {
  /**
   *
   * @param {string} name
   * @param {number} type
   * @param {string} source
   */
  constructor(name, type, source) {
    this.name = name;
    this.type = type;
    this.source = source;
    this.createShader();
  }

  createShader() {
    let shader = gl.createShader(this.type);
    gl.shaderSource(shader, this.source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      this.shader = shader;
      return;
    }

    throw new Error(gl.getShaderInfoLog(shader));
  }

  delete() {
    gl.deleteShader(this.shader);
  }
}
