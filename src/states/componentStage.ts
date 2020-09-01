import ControllableComponent from '../components/controllableComponent';
import DimensionalComponent from '../components/dimensionalComponent';
import DrawableComponent from '../components/drawableComponent';
import PathComponent from '../components/pathComponent';
import PositionalComponent from '../components/positionalComponent';
import CircularBuffer from '../dataStructures/circularBuffer';
import entityManager from '../dataStructures/entityManager';
import GameState from '../dataStructures/gameState';
import Vector from '../dataStructures/vector';
import sharedConstants from '../sharedConstants';
import ControlSystem from '../systems/controlSystem';
import DrawingSystem from '../systems/drawingSystem';
import PathFollowingSystem from '../systems/pathFollowingSystem';
import PhysicsSystem from '../systems/physicsSystem';
import ISystem from '../systems/iSystem';

export default class ComponentStage extends GameState {
  private systems: ISystem[];

  draw(): void {}
  control(): void {}
  load() {
    entityManager.createNewEntity(
        new PositionalComponent(new Vector(
            ((sharedConstants.CANVAS_WIDTH / 2) - 32 / 2),
            (sharedConstants.CANVAS_HEIGHT -
             (sharedConstants.CANVAS_HEIGHT / 8) - 32))),
        new DimensionalComponent(new Vector(32, 32)),
        new DrawableComponent('blue'),
        new ControllableComponent(0, new Vector(10, 10)));

    entityManager.createNewEntity(
        new PositionalComponent(
            new Vector(
                (sharedConstants.CANVAS_WIDTH - 32),
                (sharedConstants.CANVAS_HEIGHT / 10)),
            new Vector(5, 5)),
        new DimensionalComponent(new Vector(32, 32)),
        new DrawableComponent('red'),
        new PathComponent(
            new CircularBuffer<Vector>(
                new Vector(
                    (sharedConstants.CANVAS_WIDTH - 32) - 64,
                    (sharedConstants.CANVAS_HEIGHT / 10)),
                new Vector((sharedConstants.CANVAS_WIDTH / 2), 10),
                new Vector(0, (sharedConstants.CANVAS_HEIGHT / 10)),
                new Vector(10, (sharedConstants.CANVAS_HEIGHT / 100)),
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