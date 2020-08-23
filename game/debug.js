import Variables from './sharedVariables.js';
import Constants from './sharedConstants.js';


let debug = {
  drawLine: function(start, end, color) {
    let ctx = Variables.canvasManager.getCanvasContext();
    if (Constants.DEBUG_ON) {
      ctx.beginPath();
      ctx.strokeStyle = color ? color : 'black';
      ctx.moveTo(start.getX(), start.getY());
      ctx.lineTo(end.getX(), end.getY());
      ctx.stroke();
      ctx.closePath();
    }
  },

  drawPath: function(points, color) {
    let ctx = Variables.canvasManager.getCanvasContext();
    let length =
        (typeof points.length === 'function' ? points.length() : points.length);
    if (Constants.DEBUG_ON && length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = color ? color : 'black';

      var start = points[0];
      ctx.moveTo(start.getX(), start.getY());
      for (var i = 1; i < length; ++i) {
        var curPoint = points[i];
        ctx.lineTo(curPoint.getX(), curPoint.getY());
      }
      ctx.stroke();
      ctx.closePath();
    }
  }
};

export default debug;