import { CleanUpComponent } from '../components/CleanUpComponent';
import { CollisionDetectionComponent } from '../components/CollisionDetectionComponent';
import { DamageComponent } from '../components/DamageComponent';
import { DimensionComponent } from '../components/DimensionComponent';
import { PositionalComponent } from '../components/PositionalComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { Entity } from 'escarole';
import { GameContext } from '../GameContext';
import { DrawableImageComponent } from '../components/DrawableImageComponent';


export const ShotArchetype = new class {
  private dimensions = {x: 6, y: 20};
  private cleanup = new CleanUpComponent(-20, 20, 20, -20);

  createNew(gtx: GameContext, shooter: Entity, initialPosition: MathVector2d, velocity: MathVector2d,
      collisionMask: number, image: HTMLImageElement) {

    this.cleanup.limitLower = gtx.canvasManager.canvasHeight + 20;
    this.cleanup.limitXRight = gtx.canvasManager.canvasWidth + 20;

    return gtx.entityManager.createEntity(
      new PositionalComponent(initialPosition.x, initialPosition.y),
      new DimensionComponent(6, 15),
      new VelocityComponent(velocity.x, velocity.y),
      new CollisionDetectionComponent(collisionMask, this.dimensions),
      new DamageComponent(10, shooter),
      new DrawableImageComponent(image),
      this.cleanup,
    );
  }
};
