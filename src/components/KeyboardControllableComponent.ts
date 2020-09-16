import IComponent from '../dataStructures/IComponent';
import Vector2D from '../dataStructures/Vector2D'

export default class KeyboardControllableComponent implements IComponent {
  static cid: number = 11;
  constructor(public inputForce: Vector2D = new Vector2D(0, 0)) {}

  get cid(): number {
    return KeyboardControllableComponent.cid;
  }
};