
import {Vector2D} from '../dataStructures/Vector2D';

export class KeyboardControllableComponent {
  static cid: number = 11;
  constructor(public inputForce: Vector2D = new Vector2D(0, 0)) {}
};