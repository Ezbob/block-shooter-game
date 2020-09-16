import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';

export default class CollisionDetectionComponent implements IComponent {
  static cid: number = 3;

  constructor(public layers: number, public shape: Vector2D) {}

  get cid(): number {
    return CollisionDetectionComponent.cid;
  }
};