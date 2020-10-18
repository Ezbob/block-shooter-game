
import {CanvasManager} from './CanvasManager';
import {EventQueue} from './dataStructures/EventQueue';
import {FrameClock} from './dataStructures/FrameClock';
import {LevelLoader} from './LevelLoader';
import {SharedConstants} from './SharedConstants';
import {ISystem} from './systems/ISystem';

export const SharedVariables = {
  canvasManager: new CanvasManager(),
  frameClock: new FrameClock(SharedConstants.FPS_LIMIT),
  timedEventQueue: new EventQueue(),
  levelLoader: new LevelLoader(),
  systems: [] as ISystem[],
  drawSystems: [] as ISystem[]
};