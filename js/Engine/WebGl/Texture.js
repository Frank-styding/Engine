import { gl } from "./InitWebGl.js";
export class Texture {
  /**
   *
   * @param {HTMLImageElement} image
   */
  constructor(image) {
    this.image = image;
    this.createTexture();
  }
  createTexture() {
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 255, 255])
    );
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      this.image
    );
    gl.generateMipmap(gl.TEXTURE_2D);
  }
  bind() {
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
  }
  unbind() {
    gl.bindTexture(gl.TEXTURE_2D, null);
  }
}
