import {FrictionComponent} from '../components/FrictionComponent';
import {PositionalComponent} from '../components/PositionalComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import {GameContext} from '../GameContext';
import {Vec2dMulMut} from '../VectorOperations';

import {ISystem} from './ISystem';

export class MovementSystem implements ISystem {
  update(gtx: GameContext) {
    for (let e of gtx.entityManager) {
      let positionComp = e.getComponent(PositionalComponent);
      let velocityComp = e.getComponent(VelocityComponent)
      let frictionComp = e.getComponent(FrictionComponent);

      if (frictionComp && positionComp) {
        Vec2dMulMut(velocityComp, 1 - frictionComp.frictionBreakingForce);
      }

      if (positionComp && velocityComp) {
        positionComp.x += (velocityComp.x * gtx.frameClock.dt);
        positionComp.y += (velocityComp.y * gtx.frameClock.dt);
      }
    }
  }
};