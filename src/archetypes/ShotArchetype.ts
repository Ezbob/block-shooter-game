import { CanvasManager } from '../CanvasManager';
import {CleanUpComponent} from '../components/CleanUpComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {Entity} from '../dataStructures/Entity';
import {EntityManager} from '../dataStructures/EntityManager';


export const ShotArchetype = new class {
  private dimensions = {x: 6, y: 20};
  private cleanup = new CleanUpComponent(-20, 20, 20, -20);
  private drawable = new DrawableComponent(-1, 'orange');

  createNew(shooter: Entity, initialPosition: MathVector2d, velocity: MathVector2d,
      collisionMask: number, canvasManager: CanvasManager): Entity {

    this.cleanup.limitLower = canvasManager.canvasHeight + 20;
    this.cleanup.limitXRight = canvasManager.canvasWidth + 20;

    return EntityManager.createNewEntity(
      new PositionalComponent(initialPosition, velocity, this.dimensions),
      new CollisionDetectionComponent(collisionMask, this.dimensions),
      new DamageComponent(10, shooter),
      this.dimensions, 
      this.drawable,
      this.cleanup
    );
  }
};
