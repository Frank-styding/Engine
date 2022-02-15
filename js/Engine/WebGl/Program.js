import { gl } from "./InitWebGl.js";
import { Shader } from "./Shader.js";
export class Program {
  static currentProgram = undefined;

  /**
   *
   * @param {string} name
   * @param {string} vertexSource
   * @param {string} fragmentSource
   */

  constructor(name, vertexSource, fragmentSource) {
    this.name = name;
    this.vertexShader = new Shader(name, gl.VERTEX_SHADER, vertexSource);
    this.fragmentSource = new Shader(name, gl.FRAGMENT_SHADER, fragmentSource);
    this.createProgram();
  }

  createProgram() {
    let program = gl.createProgram();
    gl.attachShader(program, this.vertexShader.shader);
    gl.attachShader(program, this.fragmentSource.shader);
    gl.linkProgram(program);

    let success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
      this.program = program;
      return;
    }

    throw new Error(gl.getProgramInfoLog(program));
  }

  delete() {
    gl.deleteProgram(this.program);
  }

  useProgram() {
    gl.useProgram(this.program);
    Program.currentProgram = this;
  }

  unUseProgram() {
    gl.unUseProgram(this.program);
  }

  getAttrLocation(name) {
    return gl.getAttribLocation(this.program, name);
  }

  getUniformLocation(name) {
    return gl.getUniformLocation(this.program, name);
  }
}
