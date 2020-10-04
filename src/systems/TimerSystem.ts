import {TimerComponent} from '../components/TimerComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {SharedVariables} from '../SharedVariables';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {
  update(): void {
    SharedVariables.timedEventQueue.clear();
    for (let e of EntityManager) {
      let component = e.getComponentByType(TimerComponent);

      if (component) {
        if (SharedVariables.frameClock.now >= component.expireTime) {
          SharedVariables.timedEventQueue.putEvent(component.expireEventName);
          EntityManager.deleteEntity(e.id);
        }
      }
    }
  }
};