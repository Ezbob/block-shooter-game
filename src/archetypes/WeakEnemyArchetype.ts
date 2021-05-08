import {AutoShootComponent} from '../components/AutoShootComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import { DimensionComponent } from '../components/DimensionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {GunComponent} from '../components/GunComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { RoleComponent } from '../components/RoleComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import { IPathBuffer } from '../dataStructures/IPathBuffer';
import { GameContext } from '../GameContext';


export const WeakEnemyArchetype = new class {
  private friction = new FrictionComponent();
  private drawable = new DrawableComponent(1, 'red');
  private role = new RoleComponent('enemy');

  createNew(gtx: GameContext, initialPosition: MathVector2d, velocity: MathVector2d, path: IPathBuffer<MathVector2d>) {
    return gtx.entityManager.createEntity(
        new PositionalComponent(initialPosition.x, initialPosition.y),
        new DimensionComponent(32, 32),
        new VelocityComponent(0, 0),
        new PathComponent(velocity, path),
        new HealthComponent(50, 50, 400),
        new AutoShootComponent(),
        new GunComponent(700, 350),
        new CollisionDetectionComponent(0o0010, {x: 32, y: 32}),
        this.role,
        this.drawable,
        this.friction,
    );
  }
}
