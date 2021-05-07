import {CanvasBoundaryComponent} from '../components/CanvasBoundaryComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import { DimensionComponent } from '../components/DimensionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {GunComponent} from '../components/GunComponent';
import {HealthComponent} from '../components/HealthComponent';
import {HealthDisplayComponent} from '../components/HealthDisplayComponent';
import {KeyboardControllableComponent} from '../components/KeyboardControllableComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {ScoreComponent} from '../components/ScoreComponent';
import {ScoreDisplayComponent} from '../components/ScoreDisplayComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import {Entity} from '../dataStructures/Entity';
import { GameContext } from '../GameContext';

export const PlayerArchetype = new class {
  createNew(
    gtx: GameContext,
    initialPosition: MathVector2d, 
    inputVelocity: MathVector2d, 
    healthPos: MathVector2d, 
    scorePos: MathVector2d): Entity {
    return gtx.entityManager.createEntity(
      new PositionalComponent(initialPosition.x, initialPosition.y),
      new DimensionComponent(32, 32),
      new VelocityComponent(0, 0),
      new DrawableComponent(2, 'blue'), 
      new FrictionComponent(),
      new HealthComponent(100, 100, 0), 
      new HealthDisplayComponent(healthPos),
      new CollisionDetectionComponent(0o0011, {x: 32, y: 32}),
      new CanvasBoundaryComponent({x: 5, y: 5}, {x: 180, y: 30}),
      new KeyboardControllableComponent(inputVelocity), 
      new GunComponent(110, -9),
      new ScoreComponent(), 
      new ScoreDisplayComponent(scorePos)
    );
  }
};