import KeyboardControllableComponent from '../components/controllableComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PathComponent from '../components/PathComponent';
import PositionalComponent from '../components/positionalComponent';
import CircularBuffer from '../dataStructures/CircularBuffer';
import entityManager from '../dataStructures/entityManager';
import GameState from '../dataStructures/GameState';
import Vector2D from '../dataStructures/Vector2D';
import sharedConstants from '../SharedConstants';
import KeyboardControlSystem from '../systems/KeyboardControlSystem';
import DrawingSystem from '../systems/DrawingSystem';
import PathFollowingSystem from '../systems/PathFollowingSystem';
import PhysicsSystem from '../systems/PhysicsSystem';

export default class ComponentStage extends GameState {
  load() {
    const CANVAS_WIDTH = sharedConstants.CANVAS_WIDTH;
    const CANVAS_HEIGHT = sharedConstants.CANVAS_HEIGHT;

    entityManager.createNewEntity(
        new PositionalComponent(new Vector2D(
            ((CANVAS_WIDTH / 2) - 32 / 2),
            (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8) - 32))),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent('blue'),
        new KeyboardControllableComponent(new Vector2D(10, 10)));

    entityManager.createNewEntity(
        new PositionalComponent(
            new Vector2D((CANVAS_WIDTH - 32), (CANVAS_HEIGHT / 10)),
            new Vector2D(5, 5)),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent('red'),
        new PathComponent(
            new CircularBuffer<Vector2D>(
                new Vector2D((CANVAS_WIDTH - 32) - 64, (CANVAS_HEIGHT / 10)),
                new Vector2D((CANVAS_WIDTH / 2), 10),
                new Vector2D(0, (CANVAS_HEIGHT / 10)),
                new Vector2D(10, (CANVAS_HEIGHT / 100)),
                ),
            true));

    this.systems = [
      new PathFollowingSystem(), new KeyboardControlSystem(), new PhysicsSystem(),
      new DrawingSystem()
    ]
    super.load();
  }
};