import PositionComponent from '../components/positionalComponent';
import ControllableComponent from '../components/controllableComponent';
import entityManager from '../dataStructures/entityManager';
import Variables from '../sharedVariables'
import ISystem from './iSystem';

export default class ControlSystem implements ISystem {
  update() {
    let entities = entityManager.getEntitiesByComponents(
        PositionComponent, ControllableComponent);

    for (let e of entities) {
        let [pv, cv] =  e;
        if (Variables.keyboardInput.isKeyPressed('down')) {
            pv.velocity.y = cv.inputForce.y;
        }
        if (Variables.keyboardInput.isKeyPressed('up')) {
            pv.velocity.y = -cv.inputForce.y;
        }

        if (Variables.keyboardInput.isKeyPressed('left')) {
            pv.velocity.x = -cv.inputForce.x;
        }

        if (Variables.keyboardInput.isKeyPressed('right')) {
            pv.velocity.x = cv.inputForce.x;
        }
    }
  }
};