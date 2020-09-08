import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import Entity from '../dataStructures/Entity';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import CleanUpComponent from '../components/CleanUpComponent';
import CollisionDetectionComponent from '../components/CollisionDetectionComponent';
import DamageComponent from '../components/DamageComponent';

class ShotArchetype {
  private dimensions = new DimensionalComponent(new Vector2D(6, 20));
  private collision = new CollisionDetectionComponent(0o0011, new Vector2D(6, 20));
  private cleanup = new CleanUpComponent();
  private drawable = new DrawableComponent(-1, 'orange');
  private damage = new DamageComponent(10);

  createNew(initialPosition: Vector2D, velocity: Vector2D): Entity {
    return EntityManager.createNewEntity(
        new PositionComponent(initialPosition, velocity),
        this.dimensions,
        this.drawable,
        this.collision,
        this.cleanup,
        this.damage);
  }
}

export default new ShotArchetype();