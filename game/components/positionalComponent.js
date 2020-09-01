import Vector from '../dataStructures/vector.js'

export default class PositionComponent {
  constructor(position, velocity, breakingForcePercentage) {
    this.position = position || new Vector(0, 0);
    this.velocity = velocity || new Vector(0, 0);
    this.breakingForcePercentage = breakingForcePercentage || 0.6;
  }
}