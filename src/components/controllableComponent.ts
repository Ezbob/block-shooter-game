import Vector2D from '../dataStructures/vector2D'

export default class ControllableComponent {
  constructor(
      public deviceType: number = 0,
      public inputForce: Vector2D = new Vector2D(0, 0)) {}
};