import Vector2D from '../dataStructures/Vector2D';

export default class CollisionDetectionComponent {
  constructor(public layers: number, public shape: Vector2D) {}
};