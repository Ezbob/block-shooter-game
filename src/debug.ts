import Vector2D from './dataStructures/Vector2D';
import Constants from './SharedConstants';
import Variables from './SharedVariables';


export default {
  drawLine:
      (start: Vector2D, end: Vector2D, color: string = 'black') => {
        let ctx = Variables.canvasManager.getCanvasContext();
        if (Constants.DEBUG_ON) {
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.moveTo(start.x, start.y);
          ctx.lineTo(end.x, end.y);
          ctx.stroke();
          ctx.closePath();
        }
      },

  drawPath: (points: Vector2D[], color: string = 'black') => {
    let ctx = Variables.canvasManager.getCanvasContext();
    let length = points.length;
    if (Constants.DEBUG_ON && length >= 2) {
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
};
