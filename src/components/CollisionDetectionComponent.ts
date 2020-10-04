import {Vector2D} from '../dataStructures/Vector2D';

export class CollisionDetectionComponent {
  constructor(public layers: number, public shape: Vector2D) {}
};