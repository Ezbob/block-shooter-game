import {TimerComponent} from '../components/TimerComponent';
import {EntityManager} from '../dataStructures/EntityManager';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {
  private extendTime: number = 0;

  private checkExtend(ctx: GameContext) {
    this.extendTime = 0;
    for (let event of ctx.timedEventQueue) {
      if (event.name == 'timeResumed') {
        this.extendTime = event.args[0];
        return true;
      }
    }
    return false
  }

  update(ctx: GameContext): void {
    let shouldExtend = this.checkExtend(ctx);

    ctx.timedEventQueue.clear();
    for (let e of EntityManager) {
      let component = e.getComponentByType(TimerComponent);

      if (component) {
       
        if (shouldExtend) {
          component.expireTime += this.extendTime;
        }
        if (ctx.frameClock.now >= (component.expireTime) ) {
          ctx.timedEventQueue.putEvent(component.expireEventName, ...component.eventArguments);
          EntityManager.deleteEntity(e.id);
        }
      }
    }

  }
};