import {TimerComponent} from '../components/TimerComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {SharedVariables} from '../SharedVariables';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {
  private extendTime: number = 0;

  private checkExtend() {
    this.extendTime = 0;
    for (let event of SharedVariables.timedEventQueue) {
      if (event.name == 'timeResumed') {
        this.extendTime = event.args[0];
        return true;
      }
    }
    return false
  }

  update(): void {
    let shouldExtend = this.checkExtend();

    SharedVariables.timedEventQueue.clear();
    for (let e of EntityManager) {
      let component = e.getComponentByType(TimerComponent);

      if (component) {
       
        if (shouldExtend) {
          component.expireTime += this.extendTime;
        }
        if (SharedVariables.frameClock.now >= (component.expireTime) ) {
          SharedVariables.timedEventQueue.putEvent(component.expireEventName, ...component.eventArguments);
          EntityManager.deleteEntity(e.id);
        }
      }
    }

  }
};