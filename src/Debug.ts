import {SharedVariables} from './SharedVariables';

export class Debug {

  constructor(private isDebugOn = false) {}

  drawLineBetween(start: MathVector2d, end: MathVector2d, color: string = 'black') {
    let ctx = SharedVariables.canvasManager.getCanvasContext();
    if (this.isDebugOn) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawLine(start: MathVector2d, end: MathVector2d, color: string = 'black') {
    let ctx = SharedVariables.canvasManager.getCanvasContext();
    if (this.isDebugOn) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawPoint(center: MathVector2d, color: string = 'black') {
    if (this.isDebugOn) {
      let ctx = SharedVariables.canvasManager.getCanvasContext();
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(center.x + 10, center.y);
      ctx.lineTo(center.x - 10, center.y);
      ctx.moveTo(center.x, center.y + 10);
      ctx.lineTo(center.x, center.y - 10);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawPath(points: MathVector2d[], color: string = 'black') {
    let ctx = SharedVariables.canvasManager.getCanvasContext();
    let length = points.length;
    if (this.isDebugOn && length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = color;

      var start = points[0];
      ctx.moveTo(start.x, start.y);
      for (var i = 1; i < length; ++i) {
        var curPoint = points[i];
        ctx.lineTo(curPoint.x, curPoint.y);
      }
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawCircle(center: MathVector2d, radius: number) {
    let ctx = SharedVariables.canvasManager.getCanvasContext();
    if (this.isDebugOn) {
      ctx.beginPath();
      ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
      ctx.stroke();
    }
  }

  get debugOn() {
    return this.isDebugOn;
  }
};
