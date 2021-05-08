import {CircularBuffer} from '../dataStructures/CircularBuffer';
import { IPathBuffer } from '../dataStructures/IPathBuffer';

export class PathComponent {
  public nextWayPoint?: MathVector2d;
  constructor(
      public followingVelocity: MathVector2d,
      public path: IPathBuffer<MathVector2d> = new CircularBuffer(),
  ) {
    if (path.length > 0) {
      this.nextWayPoint = path.first();
    }
  }
};
