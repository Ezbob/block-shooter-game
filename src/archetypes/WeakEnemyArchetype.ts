import AutoShootComponent from '../components/AutoShootComponent';
import CollisionDetectionComponent from '../components/CollisionDetectionComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import FrictionComponent from '../components/FrictionComponent';
import GunComponent from '../components/GunComponent';
import HealthComponent from '../components/HealthComponent';
import PathComponent from '../components/PathComponent';
import PositionalComponent from '../components/PositionalComponent';
import CircularBuffer from '../dataStructures/CircularBuffer';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';


class WeakEnemyArchetype {
  private autoShoot = new AutoShootComponent();
  private dimension = new DimensionalComponent(new Vector2D(32, 32));
  private collision = new CollisionDetectionComponent(0o0011, new Vector2D(32, 32));
  private friction = new FrictionComponent();
  private drawable = new DrawableComponent(1, 'red');
  private gun = new GunComponent(700, 5);

  createNew(pos: Vector2D, velocity: Vector2D, path: CircularBuffer<Vector2D>) {
    return EntityManager.createNewEntity(
        new PositionalComponent(pos, velocity),
        new PathComponent(path),
        new HealthComponent(100, 100),
        this.autoShoot,
        this.gun,
        this.dimension,
        this.drawable,
        this.friction,
        this.collision,
    );
  }
}

export default new WeakEnemyArchetype();