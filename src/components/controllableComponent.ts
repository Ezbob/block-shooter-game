import Vector2D from '../dataStructures/Vector2D'

export default class KeyboardControllableComponent {
  constructor(
      public inputForce: Vector2D = new Vector2D(0, 0)) {}
};