import {CircularBuffer} from '../dataStructures/CircularBuffer';
import { IPathBuffer } from '../dataStructures/IPathBuffer';
import {Vector2D} from '../dataStructures/Vector2D';

export class PathComponent {
  public nextWayPoint?: Vector2D;
  constructor(
      public path: IPathBuffer<Vector2D> = new CircularBuffer(),
      public followingVelocity: Vector2D = new Vector2D(5, 5)) {
    if (path.length > 0) {
      this.nextWayPoint = path.first();
    }
  }
};
