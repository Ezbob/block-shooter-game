import Constants from './sharedConstants';
import Variables from './sharedVariables';
import Vector from './dataStructures/vector';


export default {
  drawLine: (start: Vector, end: Vector, color?: string) => {
    let ctx = Variables.canvasManager.getCanvasContext();
    if (Constants.DEBUG_ON) {
      ctx.beginPath();
      ctx.strokeStyle = color ? color : 'black';
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
    }
  },

  drawPath: (points: Vector[], color?: string) => {
    let ctx = Variables.canvasManager.getCanvasContext();
    let length = points.length;
    if (Constants.DEBUG_ON && length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = color ? color : 'black';

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
};
