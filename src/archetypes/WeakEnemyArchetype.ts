import {AutoShootComponent} from '../components/AutoShootComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {GunComponent} from '../components/GunComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import { IPathBuffer } from '../dataStructures/IPathBuffer';


export const WeakEnemyArchetype = new class {
  private friction = new FrictionComponent();
  private drawable = new DrawableComponent(1, 'red');
  private dimensions = {x: 32, y: 32};

  createNew(pos: MathVector2d, velocity: MathVector2d, path: IPathBuffer<MathVector2d>) {
    return EntityManager.createNewEntity(
        new PositionalComponent(pos, velocity, this.dimensions),
        new PathComponent(path),
        new HealthComponent(50, 50, 400),
        new AutoShootComponent(),
        new GunComponent(700, 5),
        this.drawable,
        this.friction,
        new CollisionDetectionComponent(0o0010, {x: 32, y: 32}),
    );
  }
}
