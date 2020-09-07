import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';

export default class CollisionDetectionComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();

  constructor(public layers: number, public shape: Vector2D) {}

  get cid(): number {
    return CollisionDetectionComponent.cid;
  }
};