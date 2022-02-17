import { Matrix2x2 } from "./Engine/Math/Matrix2x2.js";
import { Matrix3x3 } from "./Engine/Math/Matrix3x3.js";
import { initWebGl, gl, canvas } from "./Engine/WebGl/InitWebGl.js";
import { Program } from "./Engine/WebGl/Program.js";
import { Vao } from "./Engine/WebGl/Vao.js";
import { Vec3 } from "./Engine/Math/Vec3.js";
import { Matrix4x4 } from "./Engine/Math/Matrix4x4.js";
import { toRadiands } from "./Engine/utilities.js";
initWebGl(document.getElementById("canvas"), innerWidth, innerHeight);

let program = new Program(
  "default",
  `#version 300 es
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer

uniform mat4 u_matrix;
uniform mat4 u_projection;
in vec2 a_position;
in vec3 a_color;
out vec3 color;

// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting

  color = a_color;

  gl_Position =  u_projection * u_matrix *  vec4( a_position ,0,1.0);
}`,
  `#version 300 es
 
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
uniform vec3 u_color;
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
    data: [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5],
    /*     isVertextBuffer: true, */
    dataSize: 2,
  },
  {
    location: program.getAttrLocation("a_color"),
    type: "float",
    data: [1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0],
    dataSize: 3,
  },
  {
    type: "uint",
    data: [0, 1, 2, 0, 3, 2],
    bufferProps: {
      target: gl.ELEMENT_ARRAY_BUFFER,
    },
    isElementBuffer: true,
  },
]);

vao.laodAttributesData();

gl.clearColor(0, 0, 0, 0);
gl.clear(gl.COLOR_BUFFER_BIT);
program.useProgram();
program.uniformVec3("u_color", new Vec3(53, 53, 53).div(255));

program.uniformMatrix4x4(
  "u_projection",
  Matrix4x4.perspective(canvas.width / canvas.height, Math.PI / 4, 0.1, 1000),
  true
);

program.uniformMatrix4x4(
  "u_matrix",
  new Matrix4x4()
    .translate(0, 0, -2)
    .rotateY(toRadiands(0))
    .rotateX(toRadiands(0)),
  true
);

vao.bind();
vao.render();
