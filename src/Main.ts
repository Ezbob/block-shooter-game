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

SharedVariables.systems = [
  new PathFollowingSystem(), new KeyboardControlSystem(), new MovementSystem(),
  new CleanUpSystem(), new CollideSystem(), new AutoShootSystem(),
  new TimerSystem()
];

SharedVariables.drawSystems = [
  new DrawingSystem(),
  new PlayerUIDisplaySystem(),
];

const frameClock = SharedVariables.frameClock;

window.onblur = () => {
  frameClock.pause();
};

window.onfocus = () => {
  frameClock.resume();
};

function processFrame() {
  if (frameClock.isPaused) {
    return window.requestAnimationFrame(processFrame);
  }

  frameClock.tick();

  while (frameClock.shouldUpdate()) {
    for (let system of SharedVariables.systems) {
      system.update();
    }

    frameClock.deductLag();
  }

  for (let system of SharedVariables.drawSystems) {
    system.update();
  }

  window.requestAnimationFrame(processFrame);
}

SharedVariables.levelLoader.loadFromJson('levels/first.level.json');

window.requestAnimationFrame(processFrame);
