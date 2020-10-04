import {CircularBuffer} from '../dataStructures/CircularBuffer';
import {Vector2D} from '../dataStructures/Vector2D';

export class PathComponent {
  public nextWayPoint?: Vector2D;
  constructor(
      public path: CircularBuffer<Vector2D> = new CircularBuffer(),
      public followingVelocity: Vector2D = new Vector2D(5, 5)) {
    this.nextWayPoint = path.first();
  }
};
