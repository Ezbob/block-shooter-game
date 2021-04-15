
// Systems
import {AutoShootSystem} from './systems/AutoShootSystem';
import {CleanUpSystem} from './systems/CleanUpSystem';
import {CollideSystem} from './systems/CollideSystem';
import {DrawingSystem} from './systems/DrawingSystem';
import {KeyboardControlSystem} from './systems/KeyboardControlSystem';
import {MovementSystem} from './systems/MovementSystem';
import {PathFollowingSystem} from './systems/PathFollowingSystem';
import {PlayerUIDisplaySystem} from './systems/PlayerUIDisplaySystem';
import {TimerSystem} from './systems/TimerSystem';
import { SpawnSystem } from './systems/SpawnSystem';

// other
import { SharedVariables } from './SharedVariables';
import { EntityManager } from './dataStructures/EntityManager';
import { SpawnComponent } from './components/SpawnComponent';
import { DefaultGameLoop } from './DefaultGameLoop';

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
  new TimerSystem(), new SpawnSystem()
];

const drawSystems = [
  new DrawingSystem(),
  new PlayerUIDisplaySystem()
];

window.onblur = SharedVariables.frameClock.pause

window.onfocus = SharedVariables.frameClock.resume

EntityManager.createNewEntity(new SpawnComponent('levels/first.level.json'))

new DefaultGameLoop()
  .setDrawSystems(drawSystems)
  .setUpdateSystems(updateSystems)
  .run();