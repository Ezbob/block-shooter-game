import {ShotArchetype} from '../archetypes/ShotArchetype';
import {GunComponent} from '../components/GunComponent';
import {KeyboardControllableComponent} from '../components/KeyboardControllableComponent';

import {DynamicPositionalComponent} from '../components/DynamicPositionalComponent';
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
      let positionComponent = entity.getComponent(DynamicPositionalComponent)
      let keyboardComponent = entity.getComponent(KeyboardControllableComponent)
      let gunComponent = entity.getComponent(GunComponent)

      if (positionComponent && keyboardComponent) {
        let down = this.pressed.get('ArrowDown') == KeyPressType.KEY_DOWN;
        let up = this.pressed.get('ArrowUp') == KeyPressType.KEY_DOWN;
        let left = this.pressed.get('ArrowLeft') == KeyPressType.KEY_DOWN;
        let right = this.pressed.get('ArrowRight') == KeyPressType.KEY_DOWN;

        if (down && !up) {
          positionComponent.velocity.y = keyboardComponent.inputForce.y;
        }

        if (up && !down) {
          positionComponent.velocity.y = -keyboardComponent.inputForce.y;
        }

        if (left && !right) {
          positionComponent.velocity.x = -keyboardComponent.inputForce.x;
        }

        if (right && !left) {
          positionComponent.velocity.x = keyboardComponent.inputForce.x;
        }

        if (Math.abs(positionComponent.velocity.x) == Math.abs(positionComponent.velocity.y)) {
          Vec2dDivMut(positionComponent.velocity, this.squareRoot2) // scales back diagonal movement
        }

        if (gunComponent && this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
          let diff = gtx.frameClock.now - gunComponent.timeSinceLast;
          if (diff > gunComponent.shotDelay) {
            let initialPosition = {
              x:  positionComponent.position.x + positionComponent.dimension.x / 2,
              y:  positionComponent.position.y - positionComponent.dimension.y
            }
            let velocity = {
              x: 0, 
              y: gunComponent.bulletVelocity
            }
            let collision = 0o0010

            ShotArchetype.createNew(
              gtx,
              entity,
              initialPosition,
              velocity,
              collision
            );

            gunComponent.timeSinceLast = gtx.frameClock.now;
          }
        }
      }
    }

    this.releaseKeys();
  }
};