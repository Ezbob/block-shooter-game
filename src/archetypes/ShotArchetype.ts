import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import Entity from '../dataStructures/Entity';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import CleanUpComponent from '../components/CleanUpComponent';
import CollisionDetectionComponent from '../components/CollisionDetectionComponent';
import DamageComponent from '../components/DamageComponent';

class ShotArchetype {
  private dimensions = new Vector2D(6, 20);
  private cleanup = new CleanUpComponent();
  private drawable = new DrawableComponent(-1, 'orange');

  createNew(shooter: Entity, initialPosition: Vector2D, velocity: Vector2D, collisionMask: number): Entity {
    return EntityManager.createNewEntity(
        new PositionComponent(initialPosition, velocity, this.dimensions),
        this.dimensions,
        this.drawable,
        new CollisionDetectionComponent(collisionMask, this.dimensions),
        this.cleanup,
        new DamageComponent(10, shooter));
  }
}

export default new ShotArchetype();