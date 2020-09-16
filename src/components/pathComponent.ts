import CircularBuffer from '../dataStructures/CircularBuffer';
import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';

export default class PathComponent implements IComponent {
  static cid: number = 12;

  public nextWayPoint?: Vector2D;
  constructor(
      public path: CircularBuffer<Vector2D> = new CircularBuffer(),
      public followingVelocity: Vector2D = new Vector2D(5, 5)) {
    this.nextWayPoint = path.first();
  }

  get cid() {
    return PathComponent.cid;
  }
};
