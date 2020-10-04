import {TimerComponent} from './components/TimerComponent';
import {EntityManager} from './dataStructures/EntityManager';
import {SharedVariables} from './SharedVariables';
import {AutoShootSystem} from './systems/AutoShootSystem';
import {CleanUpSystem} from './systems/CleanUpSystem';
import {CollideSystem} from './systems/CollideSystem';
import {DrawingSystem} from './systems/DrawingSystem';
import {KeyboardControlSystem} from './systems/KeyboardControlSystem';
import {MovementSystem} from './systems/MovementSystem';
import {PathFollowingSystem} from './systems/PathFollowingSystem';
import {PlayerUIDisplaySystem} from './systems/PlayerUIDisplaySystem';
import {TimerSystem} from './systems/TimerSystem';

window.onblur = () => {
  SharedVariables.isPaused = true;
};

window.onfocus = () => {
  SharedVariables.isPaused = false;
};

SharedVariables.systems = [
  new PathFollowingSystem(), new KeyboardControlSystem(), new MovementSystem(),
  new CleanUpSystem(), new CollideSystem(), new AutoShootSystem(),
  new TimerSystem()
];

SharedVariables.drawSystems = [
  new DrawingSystem(),
  new PlayerUIDisplaySystem(),
];

EntityManager.createNewEntity(new TimerComponent('nextPath', 8000));


function frame() {
  if (SharedVariables.isPaused) {
    return window.requestAnimationFrame(frame);
  }

  SharedVariables.frameClock.update();

  while (SharedVariables.frameClock.shouldUpdate()) {
    for (let system of SharedVariables.systems) {
      system.update();
    }

    SharedVariables.frameClock.deductLag();
  }

  for (let system of SharedVariables.drawSystems) {
    system.update();
  }

  window.requestAnimationFrame(frame);
}

SharedVariables.levelLoader.loadFromJson('levels/first.level.json');

window.requestAnimationFrame(frame);
