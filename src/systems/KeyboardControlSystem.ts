import {ShotArchetype} from '../archetypes/ShotArchetype';
import { DimensionComponent } from '../components/DimensionComponent';
import {GunComponent} from '../components/GunComponent';
import {KeyboardControllableComponent} from '../components/KeyboardControllableComponent';

import {PositionalComponent} from '../components/PositionalComponent';
import { VelocityComponent } from '../components/VelocityComponent';
import {GameContext} from '../GameContext';
import { Vec2dDivMut } from '../VectorOperations';

import {ISystem} from './ISystem';

enum KeyPressType {
  NO_KEY,
  KEY_DOWN,
  KEY_UP,
  KEY_PRESS
}

export class KeyboardControlSystem implements ISystem {
  constructor() {
    window.onkeydown = window.onkeyup = window.onkeypress =
        this.onEvent.bind(this)
  }

  private pressed: Map<string, KeyPressType> = new Map<string, KeyPressType>();

  private squareRoot2 = Math.sqrt(2);

  onEvent(event: KeyboardEvent) {
    switch (event.type) {
      case 'keydown':
        this.pressed.set(event.code, KeyPressType.KEY_DOWN);
        break;
      case 'keyup':
        this.pressed.set(event.code, KeyPressType.KEY_UP);
        break;
      case 'keypress':
        this.pressed.set(event.code, KeyPressType.KEY_PRESS);
        break;
      default:
        this.pressed.set(event.code, KeyPressType.NO_KEY);
        break;
    }
  }

  releaseKeys() {
    for (let [key, value] of this.pressed) {
      if (value == KeyPressType.KEY_UP) {
        this.pressed.set(key, KeyPressType.NO_KEY);
      }
    }
  }

  update(gtx: GameContext) {
    for (let entity of gtx.entityManager) {
      let positionComponent = entity.getComponent(PositionalComponent)
      let keyboardComponent = entity.getComponent(KeyboardControllableComponent)
      let gunComponent = entity.getComponent(GunComponent)
      let velocityComp = entity.getComponent(VelocityComponent)
      let dimensionComp = entity.getComponent(DimensionComponent)

      if (positionComponent && keyboardComponent) {
        let down = this.pressed.get('ArrowDown') == KeyPressType.KEY_DOWN;
        let up = this.pressed.get('ArrowUp') == KeyPressType.KEY_DOWN;
        let left = this.pressed.get('ArrowLeft') == KeyPressType.KEY_DOWN;
        let right = this.pressed.get('ArrowRight') == KeyPressType.KEY_DOWN;

        if (down && !up) {
          velocityComp.y = keyboardComponent.inputForce.y;
        }

        if (up && !down) {
          velocityComp.y = -keyboardComponent.inputForce.y;
        }

        if (left && !right) {
          velocityComp.x = -keyboardComponent.inputForce.x;
        }

        if (right && !left) {
          velocityComp.x = keyboardComponent.inputForce.x;
        }

        if (Math.abs(velocityComp.x) == Math.abs(velocityComp.y)) {
          Vec2dDivMut(velocityComp, this.squareRoot2) // scales back diagonal movement
        }

        if (gunComponent && this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
          let diff = gtx.frameClock.now - gunComponent.timeSinceLast;
          if (diff > gunComponent.shotDelay) {
            let initialPosition = {
              x:  positionComponent.x,
              y:  positionComponent.y - dimensionComp.y
            }
            let velocity = {
              x: 0, 
              y: gunComponent.gunForce
            }
            let collision = 0o0010

            ShotArchetype.createNew(
              gtx,
              entity,
              initialPosition,
              velocity,
              collision,
              gtx.assets.shot1
            );

            gunComponent.timeSinceLast = gtx.frameClock.now;
          }
        }
      }
    }

    this.releaseKeys();
  }
};