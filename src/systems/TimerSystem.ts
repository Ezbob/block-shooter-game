import TimerComponent from '../components/TimerComponent';
import EntityManager from '../dataStructures/EntityManager';
import SharedVariables from '../SharedVariables';
import ISystem from './ISystem';

export default class TimerSystem implements ISystem {
  update(): void {
    for (let e of EntityManager) {
      let component = e.getComponentByType(TimerComponent);

      if (component) {
        if (SharedVariables.frameClock.now >= component.expireTime) {
          console.log('hello');
          EntityManager.deleteEntity(e.id);
        }
      }
    }
  }
};