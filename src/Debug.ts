import {CanvasManager} from './CanvasManager';


export class Debug {

  constructor(private isDebugOn = false) {}

  drawLineBetween(manager: CanvasManager, start: MathVector2d, end: MathVector2d, color: string = 'black') {
    let ctx = manager.getUiCanvasContext();
    if (this.isDebugOn) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawLine(manager: CanvasManager, start: MathVector2d, end: MathVector2d, color: string = 'black') {
    let ctx = manager.getUiCanvasContext();
    if (this.isDebugOn) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
    }
  }

  drawPoint(manager: CanvasManager, center: MathVector2d, color: string = 'black') {
    if (this.isDebugOn) {
      let ctx = manager.getUiCanvasContext();
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

  drawPath(manager: CanvasManager, points: MathVector2d[], color: string = 'black') {
    let ctx = manager.getUiCanvasContext();
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

  drawCircle(manager: CanvasManager, center: MathVector2d, radius: number) {
    let ctx = manager.getUiCanvasContext();
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
