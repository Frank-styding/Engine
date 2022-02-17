import { Matrix2x2 } from "./Engine/Math/Matrix2x2.js";
import { Matrix3x3 } from "./Engine/Math/Matrix3x3.js";
import { initWebGl, gl } from "./Engine/WebGl/InitWebGl.js";
import { Program } from "./Engine/WebGl/Program.js";
import { Vao } from "./Engine/WebGl/Vao.js";

initWebGl(document.getElementById("canvas"), innerWidth, innerHeight);

let program = new Program(
  "default",
  `#version 300 es
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec3 a_color;
out vec3 color;
// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting

  color = a_color;
  gl_Position = vec4(a_position,0,1);
}`,
  `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
in vec3 color;
out vec4 outColor;
 
void main() {
  // Just set the output to a constant reddish-purple
  outColor = vec4(color,1);
}
`
);

let vao = new Vao("default", [
  {
    location: program.getAttrLocation("a_position"),
    type: "float",
    data: [
      0.5, -0.5, -0.5, -0.5, -0.5, 0.5,

      0.5, 0.5, 0.5, -0.5, -0.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, 0.5,
    ],
    isVertextBuffer: true,
    dataSize: 2,
  },
  {
    location: program.getAttrLocation("a_color"),
    type: "float",
    data: [
      1, 0, 1, 1, 1, 0, 0, 1, 1, 0.5, 0.5, 0.5, 1, 0, 1, 0, 1, 1, 0.5, 0.5, 0.5,
      1, 0, 1, 0, 1, 1,
    ],
    dataSize: 3,
  },
]);

vao.laodAttributesData();

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
program.useProgram();
vao.bind();
vao.render();
let matrix = new Matrix2x2();
matrix.scale(2, 2);
console.log(Matrix2x2.inverse(matrix));
console.log(matrix);
