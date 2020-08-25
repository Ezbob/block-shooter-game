import Constants from './sharedConstants.js';
import Variables from './sharedVariables.js';


export default {
  drawLine: (start, end, color) => {
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

  drawPath: (points, color) => {
    let ctx = Variables.canvasManager.getCanvasContext();
    let length =
        (typeof points.length === 'function' ? points.length() : points.length);
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
