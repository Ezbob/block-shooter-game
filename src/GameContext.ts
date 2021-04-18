
import {CanvasManager} from './CanvasManager';
import {EventQueue} from './dataStructures/EventQueue';
import {FrameClock} from './dataStructures/FrameClock';
import {Debug} from './Debug';

export interface GameContext {
  canvasManager: CanvasManager,
  frameClock: FrameClock,
  timedEventQueue: EventQueue,
  debugging: Debug
};

export function initGameContext(config: ConfigurationJson): GameContext {
  const c = new EventQueue()
  return {
    canvasManager: new CanvasManager(config.CANVAS_HTML_ID, config.CANVAS_WIDTH, config.CANVAS_HEIGHT),
    frameClock: new FrameClock(config.FPS_LIMIT, c),
    timedEventQueue: c,
    debugging: new Debug(config.DEBUG_ON)
  }
}