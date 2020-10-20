
import {CanvasManager} from './CanvasManager';
import {EventQueue} from './dataStructures/EventQueue';
import {FrameClock} from './dataStructures/FrameClock';
import {Debug} from './Debug';
import {LevelLoader} from './LevelLoader';

export const SharedVariables = {
  canvasManager: null as CanvasManager | null,
  frameClock: null as FrameClock | null,
  timedEventQueue: null as EventQueue | null,
  levelLoader: null as LevelLoader | null,
  debugging: null as Debug,

  init(config: ConfigurationJson) {
    this.canvasManager = new CanvasManager(config.CANVAS_HTML_ID, config.CANVAS_WIDTH, config.CANVAS_HEIGHT);
    this.frameClock = new FrameClock(config.FPS_LIMIT);
    this.timedEventQueue = new EventQueue();
    this.levelLoader = new LevelLoader();
    this.levelLoader = new LevelLoader();
    this.timedEventQueue = new EventQueue();
    this.debugging = new Debug(config.DEBUG_ON);
  }
};