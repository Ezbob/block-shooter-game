import { SpawnCountdownComponent } from '../components/SpawnCountdownComponent';
import {TimerComponent} from '../components/TimerComponent';
import {GameContext} from '../GameContext';
import {ISystem} from './ISystem';

export class TimerSystem implements ISystem {

  update(gtx: GameContext): void {
    let extendTime = 0;

    for (let e of gtx.entityManager) {
      let component = e.getComponent(TimerComponent);

      if (component && component.eventName == "timeResumed") {
        // this timer component extends the time of all other timed components.
        // This makes it possible to separate the in-game time from the real time such
        // that spawn f.x. always takes a certain amount in-game time
        extendTime += component.time
        gtx.entityManager.deleteEntity(e)
      }
    }

    for (let e of gtx.entityManager) {
      let component = e.getComponent(TimerComponent)

      if (component) {
        component.time += extendTime;

        if (gtx.frameClock.now >= (component.time) ) {

          switch(component.eventName) {
            case 'spawnTimeout':
              let spawn = component.spawn
              spawn.shouldSpawn = true
              break;
          }

          gtx.entityManager.deleteEntity(e);
        }
      }

      let component2 = e.getComponent(SpawnCountdownComponent)

      if (component2) {
        if (component2.countdown <= 0) {

          let spawn = component2.spawn
          spawn.shouldSpawn = true

          gtx.entityManager.deleteEntity(e)
        }
      }
    }

  }
};