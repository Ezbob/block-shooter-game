import CanvasBoundaryComponent from '../components/CanvasBoundaryComponent';
import CollisionDetectionComponent from '../components/CollisionDetectionComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import FrictionComponent from '../components/FrictionComponent';
import GunComponent from '../components/GunComponent';
import HealthComponent from '../components/HealthComponent';
import HealthDisplayComponent from '../components/HealthDisplayComponent';
import KeyboardControllableComponent from '../components/KeyboardControllableComponent';
import PositionalComponent from '../components/PositionalComponent';
import Entity from '../dataStructures/Entity';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';

class PlayerArchetype {
  createNew(initialPosition: Vector2D, inputVelocity: Vector2D): Entity {
    return EntityManager.createNewEntity(
        new PositionalComponent(initialPosition),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent(2, 'blue'), new FrictionComponent(),
        new HealthComponent(100, 100), new HealthDisplayComponent(),
        new CollisionDetectionComponent(0o0011, new Vector2D(32, 32)),
        new CanvasBoundaryComponent(new Vector2D(5, 5), new Vector2D(180, 30)),
        new KeyboardControllableComponent(inputVelocity),
        new GunComponent(110));
  }
};

export default new PlayerArchetype();