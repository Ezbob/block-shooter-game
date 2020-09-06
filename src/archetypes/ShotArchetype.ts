import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PositionComponent from '../components/PositionalComponent';
import Entity from '../dataStructures/Entity';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import CleanUpComponent from '../components/CleanUpComponent';

class ShotArchetype {
  private dimensions = new Vector2D(6, 20);
  createNew(initialPosition: Vector2D, velocity: Vector2D): Entity {
    return EntityManager.createNewEntity(
        new PositionComponent(initialPosition, velocity),
        new DimensionalComponent(this.dimensions),
        new DrawableComponent(-1, 'orange'),
        new CleanUpComponent());
  }
}

export default new ShotArchetype();