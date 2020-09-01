import GameState from '../dataStructures/gameState.js'
import entityManager from '../dataStructures/entityManager.js'
import PositionalComponent from '../components/positionalComponent.js'
import DimensionalComponent from '../components/dimensionalComponent.js';
import DrawableComponent from '../components/drawableComponent.js';
import Vector from '../dataStructures/vector.js';
import DrawingSystem from '../systems/drawingSystem.js';
import ControllableComponent from '../components/controllableComponent.js';
import ControlSystem from '../systems/controlSystem.js';
import sharedConstants from '../sharedConstants.js';
import PhysicsSystem from '../systems/physicsSystem.js';

export default class ComponentStage extends GameState {

    load() {
        entityManager.createNewEntity(
            new PositionalComponent(),
            new DimensionalComponent(new Vector(32, 32)),
            new DrawableComponent(),
            new ControllableComponent(0, new Vector(5, 0))
        );

        entityManager.createNewEntity(
            new PositionalComponent(
                new Vector( sharedConstants.CANVAS_WIDTH - 32, sharedConstants.CANVAS_HEIGHT - 32)),
            new DimensionalComponent(new Vector(32, 32)),
            new DrawableComponent('red'),
            new ControllableComponent(0, new Vector(5, 0))
        );

        entityManager.createNewEntity(
            new PositionalComponent(
                new Vector( 0, sharedConstants.CANVAS_HEIGHT - 32)),
            new DimensionalComponent(new Vector(32, 32)),
            new DrawableComponent('green'),
            new ControllableComponent(0, new Vector(5, 0))
        );

        entityManager.createNewEntity(
            new PositionalComponent(
                new Vector( sharedConstants.CANVAS_WIDTH - 32, 0)),
            new DimensionalComponent(new Vector(32, 32)),
            new DrawableComponent('violet'),
            new ControllableComponent(0, new Vector(5, 0))
        );

        this.systems = [
            new ControlSystem(),
            new PhysicsSystem(),
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