import GameState from '../dataStructures/GameState';
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
    this.systems = [
      new PathFollowingSystem(), new KeyboardControlSystem(),
      new MovementSystem(), new DrawingSystem(), new CleanUpSystem(),
      new CollideSystem(), new AutoShootSystem(), new HealthDisplaySystem()
    ]
    super.load();
  }
};