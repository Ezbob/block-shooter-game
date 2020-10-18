import {CleanUpComponent} from '../components/CleanUpComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {Entity} from '../dataStructures/Entity';
import {EntityManager} from '../dataStructures/EntityManager';

export const ShotArchetype = new class {
  private dimensions = {x: 6, y: 20};
  private cleanup = new CleanUpComponent();
  private drawable = new DrawableComponent(-1, 'orange');

  createNew(
      shooter: Entity, initialPosition: MathVector2d, velocity: MathVector2d,
      collisionMask: number): Entity {
    return EntityManager.createNewEntity(
        new PositionalComponent(initialPosition, velocity, this.dimensions),
        this.dimensions, this.drawable,
        new CollisionDetectionComponent(collisionMask, this.dimensions),
        this.cleanup, new DamageComponent(10, shooter));
  }
};
