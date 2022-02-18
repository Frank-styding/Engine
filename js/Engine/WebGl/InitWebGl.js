/** 
 @type {WebGL2RenderingContext} gl
*/
export let gl;

/**
 * @type {HTMLCanvasElement} canvas
 */
export let canvas;

/**
 *
 * @param {HTMLCanvasElement} canvas
 * @returns {WebGL2RenderingContext}
 */
export function initWebGl(_canvas, width, height) {
  canvas = _canvas;
  canvas.width = width;
  canvas.height = height;
  gl = _canvas.getContext("webgl2");
  return gl;
}

/**
 *
 * @param {number} width : ;
 * @param {height} height
 */
export function setDimention(width, height) {
  canvas.width = width;
  canvas.height = height;
}
