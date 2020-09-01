import Vector from '../dataStructures/vector'

export default class ControllableComponent {
  constructor(
      public deviceType: number = 0,
      public inputForce: Vector = new Vector(0, 0)) {}
};