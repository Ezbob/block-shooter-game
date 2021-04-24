import {AutoShootComponent} from '../components/AutoShootComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {GunComponent} from '../components/GunComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { IPathBuffer } from '../dataStructures/IPathBuffer';
import { GameContext } from '../GameContext';


export const WeakEnemyArchetype = new class {
  private friction = new FrictionComponent();
  private drawable = new DrawableComponent(1, 'red');
  private dimensions = {x: 32, y: 32};

  createNew(gtx: GameContext, pos: MathVector2d, velocity: MathVector2d, path: IPathBuffer<MathVector2d>) {
    return gtx.entityManager.createEntity(
        new PositionalComponent(pos, velocity, this.dimensions),
        new PathComponent(path),
        new HealthComponent(50, 50, 400),
        new AutoShootComponent(),
        new GunComponent(700, 5),
        new CollisionDetectionComponent(0o0010, {x: 32, y: 32}),
        this.drawable,
        this.friction,
    );
  }
}
