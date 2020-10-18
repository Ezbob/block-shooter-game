import {CircularBuffer} from '../dataStructures/CircularBuffer';
import { IPathBuffer } from '../dataStructures/IPathBuffer';

export class PathComponent {
  public nextWayPoint?: MathVector2d;
  constructor(
      public path: IPathBuffer<MathVector2d> = new CircularBuffer(),
      public followingVelocity: MathVector2d = {x: 5, y: 5}) {
    if (path.length > 0) {
      this.nextWayPoint = path.first();
    }
  }
};
