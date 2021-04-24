import {TimerComponent} from '../components/TimerComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {
  private extendTime: number = 0;

  private checkExtend(gtx: GameContext) {
    this.extendTime = 0;
    for (let event of gtx.timedEventQueue) {
      if (event.name == 'timeResumed') {
        this.extendTime = event.args[0];
        return true;
      }
    }
    return false
  }

  update(gtx: GameContext): void {
    let shouldExtend = this.checkExtend(gtx);

    gtx.timedEventQueue.clear();
    for (let e of gtx.entityManager) {
      let component = e.getComponent(TimerComponent);

      if (component) {
       
        if (shouldExtend) {
          component.expireTime += this.extendTime;
        }
        if (gtx.frameClock.now >= (component.expireTime) ) {
          gtx.timedEventQueue.putEvent(component.expireEventName, ...component.eventArguments);
          gtx.entityManager.deleteEntity(e.id);
        }
      }
    }

  }
};