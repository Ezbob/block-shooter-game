import CircularBuffer from '../dataStructures/CircularBuffer';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';
import IComponent from '../dataStructures/IComponent';

export default class PathComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();

  public nextWayPoint: Vector2D|null;
  constructor(
      public path: CircularBuffer<Vector2D> = new CircularBuffer(),
      public reverseWhenDone: boolean = false,
      public followingVelocity: Vector2D = new Vector2D(5, 5)) {
    this.nextWayPoint = null;
  }

  get cid() {
    return PathComponent.cid;
  }
};
