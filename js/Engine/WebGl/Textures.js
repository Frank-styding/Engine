import { gl } from "./InitWebGl.js";

export class Textures {
  /**
   *
   * @param {HTMLImageElement[]} images
   */
  constructor(images) {
    this.images = images;
    this.createTextures();
  }
  createTextures() {
    this.textures = this.images.map((image) => {
      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
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
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
      gl.generateMipmap(gl.TEXTURE_2D);

      gl.bindTexture(gl.TEXTURE_2D, null);

      return texture;
    });
  }
  bind() {
    if (this.textures.length > 0) {
      for (let i = 0; i < this.textures.length; i++) {
        gl.activeTexture(gl.TEXTURE0 + i);
        gl.bindTexture(gl.TEXTURE_2D, this.textures[i]);
      }
    }
  }
  unBind() {
    if (this.textures.length > 0) {
      for (let i = 0; i < this.textures.length; i++) {
        gl.bindTexture(gl.texImage2D, null);
      }
    }
  }
}
