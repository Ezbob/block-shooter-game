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

let updateState = new Stats();
let renderState = new Stats();

SharedVariables.init({
  CANVAS_HTML_ID: "playground",
  CANVAS_HEIGHT: 900,
  CANVAS_WIDTH: 1080,
  DEBUG_ON: true,
  FPS_LIMIT: 60
});

const updateSystems = [
  new PathFollowingSystem(), new KeyboardControlSystem(), new MovementSystem(),
  new CleanUpSystem(), new CollideSystem(), new AutoShootSystem(),
  new TimerSystem()
];

const drawSystems = [
  new DrawingSystem(),
  new PlayerUIDisplaySystem()
];

window.onblur = () => {
  SharedVariables.frameClock.pause();
};

window.onfocus = () => {
  SharedVariables.frameClock.resume();
};

const processFrame = () => {
  if ( SharedVariables.frameClock.isPaused) {
    return window.requestAnimationFrame(processFrame);
  }

  SharedVariables.frameClock.tick();

  while ( SharedVariables.frameClock.shouldUpdate()) {
    if (SharedVariables.debugging.debugOn) updateState.begin();

    for (let system of updateSystems) {
      system.update();
    }

    SharedVariables.frameClock.deductLag();

    if (SharedVariables.debugging.debugOn) updateState.end();
  }

  if (SharedVariables.debugging.debugOn) renderState.begin();
  for (let system of drawSystems) {
    system.update();
  }
  if (SharedVariables.debugging.debugOn) renderState.end();

  window.requestAnimationFrame(processFrame);
}

SharedVariables.levelLoader.loadFromJson('levels/first.level.json');

if (SharedVariables.debugging.debugOn) {
  updateState.dom.style.position = renderState.dom.style.position = "relative";

  updateState.showPanel(0);
  document.getElementById('updateState').appendChild(updateState.dom);

  renderState.showPanel(0);
  document.getElementById('renderState').appendChild(renderState.dom);
}

window.requestAnimationFrame(processFrame);