import { Matrix2x2 } from "./Engine/Math/Matrix2x2.js";
import { Matrix3x3 } from "./Engine/Math/Matrix3x3.js";
import { initWebGl, gl, canvas } from "./Engine/WebGl/InitWebGl.js";
import { Program } from "./Engine/WebGl/Program.js";
import { Vao } from "./Engine/WebGl/Vao.js";
import { Vec3 } from "./Engine/Math/Vec3.js";
import { Matrix4x4 } from "./Engine/Math/Matrix4x4.js";
import { toRadiands } from "./Engine/utilities.js";
import {
  rectGeometry,
  lines,
  circleGeometry,
} from "./Engine/Geometry/Geometry.js";
import { Texture } from "./Engine/WebGl/Texture.js";
import { Textures } from "./Engine/WebGl/Textures.js";
import { Buffer } from "./Engine/WebGl/Buffer.js";

initWebGl(document.getElementById("canvas"), innerWidth, innerHeight);

let img = new Image();
img.src = "img/2021105724573_1.jpg";
img.crossOrigin = "anonymous";

let img1 = new Image();
img1.src = "img/tree-736885__480.jpg";
img1.crossOrigin = "anonymous";

Promise.all([
  new Promise((resvolve, reject) => (img.onload = () => resvolve())),
  new Promise((resvolve, reject) => (img1.onload = () => resvolve())),
]).then((item) => {
  init();
});

const vertexShader = `#version 300 es
// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer

uniform mat4 u_matrix;
uniform mat4 u_projection;
in vec3 a_position;
in vec2 a_texCord;

out vec2 text_cord;


// all shaders have a main function
void main() {
 
  // gl_Position is a special variable a vertex shader
  // is responsible for setting

  text_cord = a_texCord;

  gl_Position =  u_projection * u_matrix *  vec4( a_position,1.0);
}`;
const fragmentShader = `#version 300 es
   
// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;
 
// we need to declare an output for the fragment shader
uniform vec3 u_color;
uniform sampler2D u_texture;
uniform sampler2D u_texture1;

out vec4 outColor;

in vec2 text_cord;
 
void main() {
  // Just set the output to a constant reddish-purple


  outColor = texture(u_texture,text_cord) * texture(u_texture1,text_cord);
}
`;

function init() {
  let textures = new Textures([img, img1]);
  let program = new Program("default", vertexShader, fragmentShader);

  let shape = rectGeometry(12, 12, 1, 1);

  let vao = new Vao({
    position: {
      location: program.getAttributeLocation("a_position"),
      buffer: new Buffer(new Float32Array(shape.cords), 3),
    },
    textCord: {
      location: program.getAttributeLocation("a_texCord"),
      buffer: new Buffer(new Float32Array(shape.textCords), 2),
    },
    indexs: {
      buffer: new Buffer(new Uint16Array(shape.indexs)).setTarget(
        gl.ELEMENT_ARRAY_BUFFER
      ),
    },
  });

  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.CULL_FACE);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.DEPTH_TEST);

  program.useProgram();

  textures.bind();

  program.uniformVec3("u_color", new Vec3(53, 53, 53).div(255));
  program.uniformInt("u_texture", 0);
  program.uniformInt("u_texture1", 1);

  program.uniformMatrix4x4(
    "u_projection",
    Matrix4x4.orthographic(0, canvas.width, canvas.height, 0, 100, 0.1),
    false
  );

  program.uniformMatrix4x4(
    "u_matrix",
    new Matrix4x4()
      .translate(0, 0, -10)
      .scale(12, 12, 1)
      .rotateY(toRadiands(0))
      .rotateX(toRadiands(10)),
    true
  );

  vao.bind();
  vao.render();
  vao.unBind();
  program.unUseProgram();
}
