import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D'
import SharedVariables from '../SharedVariables';

export default class KeyboardControllableComponent implements IComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();
  constructor(public inputForce: Vector2D = new Vector2D(0, 0)) {}

  get cid(): number {
    return KeyboardControllableComponent.cid;
  }
};