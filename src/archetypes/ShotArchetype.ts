import {CleanUpComponent} from '../components/CleanUpComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DamageComponent} from '../components/DamageComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {Entity} from '../dataStructures/Entity';
import { GameContext } from '../GameContext';


export const ShotArchetype = new class {
  private dimensions = {x: 6, y: 20};
  private cleanup = new CleanUpComponent(-20, 20, 20, -20);
  private drawable = new DrawableComponent(-1, 'orange');

  createNew(gtx: GameContext, shooter: Entity, initialPosition: MathVector2d, velocity: MathVector2d,
      collisionMask: number): Entity {

    this.cleanup.limitLower = gtx.canvasManager.canvasHeight + 20;
    this.cleanup.limitXRight = gtx.canvasManager.canvasWidth + 20;

    return gtx.entityManager.createEntity(
      new PositionalComponent(initialPosition, velocity, this.dimensions),
      new CollisionDetectionComponent(collisionMask, this.dimensions),
      new DamageComponent(10, shooter),
      this.drawable,
      this.cleanup
    );
  }
};
