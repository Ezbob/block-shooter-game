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
import EntityManager from '../dataStructures/EntityManager';
import GameState from '../dataStructures/GameState';
import Vector2D from '../dataStructures/Vector2D';
import SharedConstants from '../SharedConstants';
import AutoShootSystem from '../systems/AutoShootSystem';
import CleanUpSystem from '../systems/CleanUpSystem';
import CollideSystem from '../systems/CollideSystem';
import DrawingSystem from '../systems/DrawingSystem';
import HealthDisplaySystem from '../systems/HealthDisplaySystem';
import KeyboardControlSystem from '../systems/KeyboardControlSystem';
import MovementSystem from '../systems/MovementSystem';
import PathFollowingSystem from '../systems/PathFollowingSystem';

export default class ComponentStage extends GameState {
  load() {
    const CANVAS_WIDTH = SharedConstants.CANVAS_WIDTH;
    const CANVAS_HEIGHT = SharedConstants.CANVAS_HEIGHT;

    EntityManager.createNewEntity(
        new PositionalComponent(new Vector2D(
            ((CANVAS_WIDTH / 2) - 32 / 2),
            (CANVAS_HEIGHT - (CANVAS_HEIGHT / 8) - 32))),
        new DimensionalComponent(new Vector2D(32, 32)),
        new DrawableComponent(2, 'blue'), new FrictionComponent(),
        new HealthComponent(100, 100), new HealthDisplayComponent(),
        new CollisionDetectionComponent(0o0011, new Vector2D(32, 32)),
        new CanvasBoundaryComponent(new Vector2D(5, 5), new Vector2D(180, 30)),
        new KeyboardControllableComponent(new Vector2D(10, 10)),
        new GunComponent(110));

    this.systems = [
      new PathFollowingSystem(), new KeyboardControlSystem(),
      new MovementSystem(), new DrawingSystem(), new CleanUpSystem(),
      new CollideSystem(), new AutoShootSystem(), new HealthDisplaySystem()
    ]
    super.load();
  }
};