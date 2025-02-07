export class Canvas {
  width: number;
  height: number;
  ctx: CanvasRenderingContext2D;
  constructor(
    public canvas: HTMLCanvasElement = document.createElement("canvas")
  ) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
  setSize(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  save() {
    this.ctx.save();
  }

  restore() {
    this.ctx.restore();
  }

  draw(canvas: Canvas) {
    this.ctx.drawImage(canvas.canvas, 0, 0);
  }
}
