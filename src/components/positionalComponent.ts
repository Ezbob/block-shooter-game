import Vector from '../dataStructures/vector'

export default class PositionComponent {
  constructor(
      public position: Vector = new Vector(0, 0),
      public velocity: Vector = new Vector(0, 0),
      public breakingForcePercentage: number = 0.6) {}
}