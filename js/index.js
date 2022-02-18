import { Matrix2x2 } from "./Engine/Math/Matrix2x2.js";
import { Matrix3x3 } from "./Engine/Math/Matrix3x3.js";
import { initWebGl, gl, canvas } from "./Engine/WebGl/InitWebGl.js";
import { Program } from "./Engine/WebGl/Program.js";
import { Vao } from "./Engine/WebGl/Vao.js";
import { Vec3 } from "./Engine/Math/Vec3.js";
import { Matrix4x4 } from "./Engine/Math/Matrix4x4.js";
import { toRadiands } from "./Engine/utilities.js";
import { rectGeometry, lines } from "./Engine/Geometry/Geometry.js";
import { Texture } from "./Engine/WebGl/Texture.js";
import { Textures } from "./Engine/WebGl/Textures.js";

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

function init() {
  let textures = new Textures([img, img1]);
  let program = new Program(
    "default",
    `#version 300 es
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
  }`,
    `#version 300 es
   
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
  `
  );

  let shape = rectGeometry(1, 1, 40, 40);
  let vao = new Vao("default", [
    {
      location: program.getAttrLocation("a_position"),
      type: "float",
      data: shape.cords.map((item, idx) => {
        if (idx % 3 == 2) {
          return item + (Math.random() * (0.1 - 0.05) + 0.05);
        }
        return item;
      }),
      dataSize: 3,
    },
    {
      location: program.getAttrLocation("a_texCord"),
      type: "float",
      data: shape.textCords,
      dataSize: 2,
    },
    {
      type: "uint",
      data: shape.indexs,
      bufferProps: {
        target: gl.ELEMENT_ARRAY_BUFFER,
      },
      isElementBuffer: true,
    },
  ]);
  vao.loadAttributesData();

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
    Matrix4x4.orthographic(-100, 100, 100, -100, 100, 0.1),
    false
  );

  program.uniformMatrix4x4(
    "u_matrix",
    new Matrix4x4()
      .translate(0, 0, -3)
      .scale(80, 80, 1)
      .rotateY(toRadiands(0))
      .rotateX(toRadiands(10)),
    true
  );

  vao.bind();
  vao.render();
  vao.unBind();
  program.unUseProgram();
  ///
  ///
  ///

  program.useProgram();

  textures.bind();

  program.uniformVec3("u_color", new Vec3(53, 53, 53).div(255));
  program.uniformInt("u_texture", 0);
  program.uniformInt("u_texture1", 1);

  program.uniformMatrix4x4(
    "u_projection",
    Matrix4x4.orthographic(-100, 100, 100, -100, 100, 0.1),
    false
  );

  program.uniformMatrix4x4(
    "u_matrix",
    new Matrix4x4()
      .translate(20, 0, -4)
      .scale(80, 80, 1)
      .rotateY(toRadiands(0))
      .rotateX(toRadiands(10)),
    true
  );

  vao.bind();
  vao.render();
  vao.unBind();
  program.unUseProgram();
}
