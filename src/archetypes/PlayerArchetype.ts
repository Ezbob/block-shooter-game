import { CanvasBoundaryComponent } from '../components/CanvasBoundaryComponent';
import { CollisionDetectionComponent } from '../components/CollisionDetectionComponent';
import { DimensionComponent } from '../components/DimensionComponent';
import { FrictionComponent } from '../components/FrictionComponent';
import { GunComponent } from '../components/GunComponent';
import { HealthComponent } from '../components/HealthComponent';
import { HealthDisplayComponent } from '../components/HealthDisplayComponent';
import { KeyboardControllableComponent } from '../components/KeyboardControllableComponent';
import { PositionalComponent } from '../components/PositionalComponent';
import { ScoreComponent } from '../components/ScoreComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { GameContext } from '../GameContext';
import { RoleComponent} from '../components/RoleComponent';
import { MessageComponent } from '../components/MessageComponent';
import { DrawableImageComponent } from '../components/DrawableImageComponent';

export const PlayerArchetype = new class {
  createNew(
    gtx: GameContext,
    initialPosition: MathVector2d,
    inputVelocity: MathVector2d,
    healthPos: MathVector2d,
    scorePos: InputMathVector2d,
    image: HTMLImageElement) {
    return gtx.entityManager.createEntity(
      new PositionalComponent(initialPosition.x, initialPosition.y),
      new DimensionComponent(64, 64),
      new VelocityComponent(0, 0),
      new FrictionComponent(),
      new DrawableImageComponent(image),
      new HealthComponent(100, 100, 0), 
      new HealthDisplayComponent(healthPos),
      new CollisionDetectionComponent(0o0011, {x: 42, y: 64}),
      new CanvasBoundaryComponent({x: 5, y: 5}, {x: 180, y: 30}),
      new KeyboardControllableComponent(inputVelocity), 
      new GunComponent(110, -550),
      new ScoreComponent(), 
      new MessageComponent("0", scorePos, 24),
      new RoleComponent('player')
    );
  }
};