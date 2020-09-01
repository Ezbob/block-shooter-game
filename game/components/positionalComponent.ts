import Vector from '../dataStructures/vector'

export default class PositionComponent {
  position: Vector;
  velocity: Vector;
  breakingForcePercentage: number;
  constructor(position?: Vector, velocity?: Vector, breakingForcePercentage?: number) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.breakingForcePercentage = breakingForcePercentage || 0.6;
  }
}