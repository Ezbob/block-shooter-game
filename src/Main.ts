
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
import { initGameContext } from './GameContext';
import { EntityManager } from './dataStructures/EntityManager';
import { LevelLoadComponent } from './components/LevelLoadComponent';
import { DefaultGameLoop } from './DefaultGameLoop';
import { LevelLoaderSystem } from './systems/LevelLoaderSystem';

const gameContext = initGameContext({
  CANVAS_HTML_ID: "playground",
  CANVAS_HEIGHT: 900,
  CANVAS_WIDTH: 1080,
  DEBUG_ON: true,
  FPS_LIMIT: 60
});

const updateSystems = [
  new PathFollowingSystem(), new KeyboardControlSystem(), new MovementSystem(),
  new CleanUpSystem(), new CollideSystem(), new AutoShootSystem(),
  new TimerSystem(), new SpawnSystem(), new LevelLoaderSystem()
];

const drawSystems = [
  new DrawingSystem(),
  new PlayerUIDisplaySystem()
];

window.onblur = gameContext.frameClock.pause

window.onfocus = gameContext.frameClock.resume

EntityManager.createNewEntity(new LevelLoadComponent('levels/first.level.json'))

new DefaultGameLoop(gameContext)
  .setDrawSystems(drawSystems)
  .setUpdateSystems(updateSystems)
  .run();