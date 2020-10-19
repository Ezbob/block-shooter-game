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
import * as Stats from 'stats.js';
import { SharedConstants } from './SharedConstants';

let updateState = new Stats();
let renderState = new Stats();

if (SharedConstants.DEBUG_ON) {

  updateState.dom.style.position = renderState.dom.style.position = "relative"

  updateState.showPanel(0);
  document.getElementById('updateState').appendChild(updateState.dom);

  renderState.showPanel(0);
  document.getElementById('renderState').appendChild(renderState.dom);
}

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
    if (SharedConstants.DEBUG_ON) updateState.begin();

    for (let system of SharedVariables.systems) {
      system.update();
    }

    frameClock.deductLag();

    if (SharedConstants.DEBUG_ON) updateState.end();
  }

  if (SharedConstants.DEBUG_ON) renderState.begin();
  for (let system of SharedVariables.drawSystems) {
    system.update();
  }
  if (SharedConstants.DEBUG_ON) renderState.end();

  window.requestAnimationFrame(processFrame);
}

SharedVariables.levelLoader.loadFromJson('levels/first.level.json');

window.requestAnimationFrame(processFrame);
