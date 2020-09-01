import CircularBuffer from '../dataStructures/circularBuffer';
import Vector from '../dataStructures/vector';

export default class PathComponent {
  public nextWayPoint: Vector|null;
  constructor(
      public path: CircularBuffer<Vector> = new CircularBuffer(),
      public reverseWhenDone: boolean = false,
      public followingVelocity: Vector = new Vector(5, 5)) {
    this.nextWayPoint = null;
  }
};
