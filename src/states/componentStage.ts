import ControllableComponent from '../components/controllableComponent';
import DimensionalComponent from '../components/dimensionalComponent';
import DrawableComponent from '../components/drawableComponent';
import PathComponent from '../components/pathComponent';
import PositionalComponent from '../components/positionalComponent';
import CircularBuffer from '../dataStructures/circularBuffer';
import entityManager from '../dataStructures/entityManager';
import GameState from '../dataStructures/gameState';
import Vector2D from '../dataStructures/vector2D';
import sharedConstants from '../sharedConstants';
import ControlSystem from '../systems/controlSystem';
import DrawingSystem from '../systems/drawingSystem';
import ISystem from '../systems/iSystem';
import PathFollowingSystem from '../systems/pathFollowingSystem';
import PhysicsSystem from '../systems/physicsSystem';
import sharedVariables from '../sharedVariables';

export default class ComponentStage extends GameState {
  private systems: ISystem[];

  draw(): void {}
  control(): void {
    if ( sharedVariables.keyboardInput.isKeyPressed("space") ) {
      
    }
  }
  load() {
    const CANVAS_WIDTH = sharedConstants.CANVAS_WIDTH;
    const CANVAS_HEIGHT = sharedConstants.CANVAS_HEIGHT;

    entityManager.createNewEntity(
        new PositionalComponent(new Vector2D(
            ((CANVAS_WIDTH / 2) - 32 / 2),
            (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8) - 32))),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent('blue'),
        new ControllableComponent(0, new Vector2D(10, 10)));

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
      new PathFollowingSystem(), new ControlSystem(), new PhysicsSystem(),
      new DrawingSystem()
    ]
    super.load();
  }

  update() {
    for (let system of this.systems) {
      system.update();
    }
  }
};