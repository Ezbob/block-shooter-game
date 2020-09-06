import CanvasCollisionComponent from '../components/CanvasCollisionComponent';
import KeyboardControllableComponent from '../components/controllableComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import DrawableComponent from '../components/DrawableComponent';
import PathComponent from '../components/PathComponent';
import PositionalComponent from '../components/PositionalComponent';
import CircularBuffer from '../dataStructures/CircularBuffer';
import EntityManager from '../dataStructures/EntityManager';
import GameState from '../dataStructures/GameState';
import Vector2D from '../dataStructures/Vector2D';
import SharedConstants from '../SharedConstants';
import DrawingSystem from '../systems/DrawingSystem';
import KeyboardControlSystem from '../systems/KeyboardControlSystem';
import MovementSystem from '../systems/MovementSystem';
import PathFollowingSystem from '../systems/PathFollowingSystem';
import FrictionComponent from '../components/FrictionComponent';
import CleanUpSystem from '../systems/CleanUpSystem';
import GunComponent from '../components/GunComponent';

export default class ComponentStage extends GameState {
  load() {
    const CANVAS_WIDTH = SharedConstants.CANVAS_WIDTH;
    const CANVAS_HEIGHT = SharedConstants.CANVAS_HEIGHT;

    EntityManager.createNewEntity(
        new PositionalComponent(new Vector2D(
            ((CANVAS_WIDTH / 2) - 32 / 2),
            (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8) - 32))),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent(2, 'blue'),
        new FrictionComponent(),
        new CanvasCollisionComponent(new Vector2D(5, 5), new Vector2D(180, 10)),
        new KeyboardControllableComponent(new Vector2D(10, 10)),
        new GunComponent(110));

    EntityManager.createNewEntity(
        new PositionalComponent(
            new Vector2D((CANVAS_WIDTH - 32), (CANVAS_HEIGHT / 10)),
            new Vector2D(5, 5)),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent(1, 'red'),
        new FrictionComponent(),
        new PathComponent(
            new CircularBuffer<Vector2D>(
                new Vector2D((CANVAS_WIDTH - 32) - 64, (CANVAS_HEIGHT / 10)),
                new Vector2D((CANVAS_WIDTH / 2), 10),
                new Vector2D(0, (CANVAS_HEIGHT / 10)),
                new Vector2D(10, (CANVAS_HEIGHT / 100)),
                ),
            true));

    this.systems = [
      new PathFollowingSystem(),
      new KeyboardControlSystem(),
      new MovementSystem(),
      new DrawingSystem(),
      new CleanUpSystem()
    ]
    super.load();
  }
};