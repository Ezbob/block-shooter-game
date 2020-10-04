import {Vector2D} from '../dataStructures/Vector2D';
import {SharedConstants} from '../SharedConstants';

export class ScoreDisplayComponent {
  constructor(
      public position: Vector2D = new Vector2D(
          SharedConstants.CANVAS_WIDTH - SharedConstants.CANVAS_WIDTH / 11,
          SharedConstants.CANVAS_HEIGHT - 10),
      public fontFaceName: string = 'Arial', public pixelSize: string = '22px',
      public color: string = 'black') {}
};