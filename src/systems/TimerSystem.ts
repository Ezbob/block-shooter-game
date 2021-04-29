import { SpawnComponent } from '../components/SpawnComponent';
import {TimerComponent} from '../components/TimerComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {

  update(gtx: GameContext): void {
    let extendTime = 0;

    for (let e of gtx.entityManager) {
      let component = e.getComponent(TimerComponent);

      if (component && component.expireEventName == "timeResumed") {
        // this timer component extends the time of all other timed components.
        // This makes it possible to separate the in-game time from the real time such
        // that spawn f.x. always takes a certain amount in-game time
        extendTime = component.expireTime
        gtx.entityManager.deleteEntity(e)
      }
    }

    for (let e of gtx.entityManager) {
      let component = e.getComponent(TimerComponent);

      if (component) {

        component.expireTime += extendTime;

        if (gtx.frameClock.now >= (component.expireTime) ) {

          switch(component.expireEventName) {
            case 'spawnTimeout':
              let spawn = component.eventArguments[0] as SpawnComponent
              spawn.shouldSpawn = true
              break;
          }

          gtx.entityManager.deleteEntity(e);
        }
      }
    }

  }
};