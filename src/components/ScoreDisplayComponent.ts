import { SharedVariables } from "../SharedVariables";

export class ScoreDisplayComponent {
  constructor(
      public position: MathVector2d = {
          x: SharedVariables.canvasManager.canvasWidth - SharedVariables.canvasManager.canvasWidth / 11,
          y: SharedVariables.canvasManager.canvasHeight - 10
      },
      public fontFaceName: string = 'Arial', public pixelSize: string = '22px',
      public color: string = 'black') {}
};