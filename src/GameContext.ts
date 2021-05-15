
import {CanvasManager} from './CanvasManager';
import {EntityManager} from 'escarole';
import {FrameClock} from './dataStructures/FrameClock';
import {Debug} from './Debug';

export interface GameContext {
  canvasManager: CanvasManager,
  frameClock: FrameClock,
  debugging: Debug,
  entityManager: EntityManager
};

export function initGameContext(config: ConfigurationJson): GameContext {
  const entityManager = new EntityManager()
  return {
    entityManager: entityManager,
    canvasManager: new CanvasManager(config.CANVAS_HTML_ID, config.CANVAS_WIDTH, config.CANVAS_HEIGHT),
    frameClock: new FrameClock(entityManager),
    debugging: new Debug(config.DEBUG_ON)
  }
}