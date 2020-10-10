import {SharedConstants} from './SharedConstants';
import {SharedVariables} from './SharedVariables';

let drawLineBetween =
    (start: {x: number, y: number}, end: {x: number, y: number}, color: string = 'black') => {
      let ctx = SharedVariables.canvasManager.getCanvasContext();
      if (SharedConstants.DEBUG_ON) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
        ctx.closePath();
      }
    };

let drawLine = (start: {x: number, y: number}, end: {x: number, y: number}, color: string = 'black') => {
  let ctx = SharedVariables.canvasManager.getCanvasContext();
  if (SharedConstants.DEBUG_ON) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    ctx.stroke();
    ctx.closePath();
  }
};

let drawPoint = (center: {x: number, y: number}, color: string = 'black') => {
  if (SharedConstants.DEBUG_ON) {
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
};

let drawPath = (points: {x: number, y: number}[], color: string = 'black') => {
  let ctx = SharedVariables.canvasManager.getCanvasContext();
  let length = points.length;
  if (SharedConstants.DEBUG_ON && length >= 2) {
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
};

let drawCircle = (center: {x: number, y: number}, radius: number) => {
  let ctx = SharedVariables.canvasManager.getCanvasContext();
  ctx.beginPath();
  ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
  ctx.stroke()
};

export const Debug = {drawLine, drawLineBetween, drawPoint, drawPath, drawCircle};
