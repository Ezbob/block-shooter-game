
import {CanvasManager} from './CanvasManager';
import {EntityManager} from 'escarole';
import {FrameClock} from './dataStructures/FrameClock';
import {Debug} from './Debug';
import { Utils } from './Utils';

export interface GameContext {
  canvasManager: CanvasManager,
  frameClock: FrameClock,
  debugging: Debug,
  entityManager: EntityManager
  assets: Assets
};

export interface Assets {
  player1: HTMLImageElement,
  shot1: HTMLImageElement,
  weak: HTMLImageElement
}

export async function initGameContext(config: ConfigurationJson): Promise<GameContext> {
  const entityManager = new EntityManager()
  let assets = {
    player1: await Utils.promiseLoadImage('/assets/player.png'),
    shot1: await Utils.promiseLoadImage('/assets/shot.png'),
    weak: await Utils.promiseLoadImage('/assets/weak.png')
  }

  return {
    entityManager: entityManager,
    canvasManager: new CanvasManager(config.CANVAS_HTML_ID, config.CANVAS_WIDTH, config.CANVAS_HEIGHT),
    frameClock: new FrameClock(entityManager),
    debugging: new Debug(config.DEBUG_ON),
    assets
  }
}