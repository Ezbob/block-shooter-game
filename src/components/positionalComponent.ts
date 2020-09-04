import Vector2D from '../dataStructures/Vector2D'

export default class PositionComponent {
  constructor(
      public position: Vector2D = new Vector2D(0, 0),
      public velocity: Vector2D = new Vector2D(0, 0),
      public breakingForcePercentage: number = 0.6) {}
}