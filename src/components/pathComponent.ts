import CircularBuffer from '../dataStructures/circularBuffer';
import Vector2D from '../dataStructures/vector2D';

export default class PathComponent {
  public nextWayPoint: Vector2D|null;
  constructor(
      public path: CircularBuffer<Vector2D> = new CircularBuffer(),
      public reverseWhenDone: boolean = false,
      public followingVelocity: Vector2D = new Vector2D(5, 5)) {
    this.nextWayPoint = null;
  }
};
