import GameState from '../dataStructures/gameState.js'
import entityManager from '../dataStructures/entityManager.js'
import PositionalComponent from '../components/positionalComponent.js'
import DimensionalComponent from '../components/dimensionalComponent.js';
import DrawableComponent from '../components/drawableComponent.js';
import Vector from '../dataStructures/vector.js';
import DrawingSystem from '../systems/drawingSystem.js';

export default class ComponentStage extends GameState {

    load() {
        this.player = entityManager.createNewEntity(
            new PositionalComponent(),
            new DimensionalComponent(new Vector(32, 32)),
            new DrawableComponent()
        );

        this.systems = [
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