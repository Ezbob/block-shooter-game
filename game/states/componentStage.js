import ControllableComponent from '../components/controllableComponent.js';
import DimensionalComponent from '../components/dimensionalComponent.js';
import DrawableComponent from '../components/drawableComponent.js';
import PositionalComponent from '../components/positionalComponent.js'
import entityManager from '../dataStructures/entityManager.js'
import GameState from '../dataStructures/gameState.js'
import Vector from '../dataStructures/vector.js';
import sharedConstants from '../sharedConstants.js';
import ControlSystem from '../systems/controlSystem.js';
import DrawingSystem from '../systems/drawingSystem.js';
import PathFollowingSystem from '../systems/pathFollowingSystem.js';
import PhysicsSystem from '../systems/physicsSystem.js';
import PathComponent from '../components/pathComponent.js';
import CircularBuffer from '../dataStructures/circularBuffer.js';

export default class ComponentStage extends GameState {
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
        new PositionalComponent(new Vector(
            (sharedConstants.CANVAS_WIDTH - 32),
            (sharedConstants.CANVAS_HEIGHT / 10)),
            new Vector(5, 5)),
        new DimensionalComponent(new Vector(32, 32)),
        new DrawableComponent('red'),
        new PathComponent(new CircularBuffer(
          new Vector((sharedConstants.CANVAS_WIDTH - 32) - 64, (sharedConstants.CANVAS_HEIGHT / 10)),
          new Vector(0, (sharedConstants.CANVAS_HEIGHT / 10))
        )));

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