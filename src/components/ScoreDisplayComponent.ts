
import {SharedConstants} from '../SharedConstants';

export class ScoreDisplayComponent {
  constructor(
      public position: MathVector2d = {
          x: SharedConstants.CANVAS_WIDTH - SharedConstants.CANVAS_WIDTH / 11,
          y: SharedConstants.CANVAS_HEIGHT - 10
      },
      public fontFaceName: string = 'Arial', public pixelSize: string = '22px',
      public color: string = 'black') {}
};