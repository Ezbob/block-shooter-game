
import {Vector2D} from '../dataStructures/Vector2D'

export class PositionalComponent {
  constructor(
      public position: Vector2D = new Vector2D(0, 0),
      public velocity: Vector2D = new Vector2D(0, 0),
      public dimension: Vector2D = new Vector2D(10, 10),
      public breakingForcePercentage: number = 0.6) {}
}