import {AutoShootComponent} from '../components/AutoShootComponent';
import {CollisionDetectionComponent} from '../components/CollisionDetectionComponent';
import {DrawableComponent} from '../components/DrawableComponent';
import {FrictionComponent} from '../components/FrictionComponent';
import {GunComponent} from '../components/GunComponent';
import {HealthComponent} from '../components/HealthComponent';
import {PathComponent} from '../components/PathComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import {CircularBuffer} from '../dataStructures/CircularBuffer';
import {EntityManager} from '../dataStructures/EntityManager';
import {Vector2D} from '../dataStructures/Vector2D';


export const WeakEnemyArchetype = new class {
  private friction = new FrictionComponent();
  private drawable = new DrawableComponent(1, 'red');
  private dimensions = new Vector2D(32, 32);

  createNew(pos: Vector2D, velocity: Vector2D, path: CircularBuffer<Vector2D>) {
    return EntityManager.createNewEntity(
        new PositionalComponent(pos, velocity, this.dimensions),
        new PathComponent(path),
        new HealthComponent(100, 100, 400),
        new AutoShootComponent(),
        new GunComponent(700, 5),
        this.drawable,
        this.friction,
        new CollisionDetectionComponent(0o0010, new Vector2D(32, 32)),
    );
  }
}
