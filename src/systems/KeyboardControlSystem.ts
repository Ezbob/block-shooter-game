import {ShotArchetype} from '../archetypes/ShotArchetype';
import {GunComponent} from '../components/GunComponent';
import {KeyboardControllableComponent} from '../components/KeyboardControllableComponent';

import {PositionalComponent} from '../components/PositionalComponent';
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
    for (let e of gtx.entityManager) {
      let pv = e.getComponent(PositionalComponent);
      let keyboardComponent =
          e.getComponent(KeyboardControllableComponent);
      let gunComp = e.getComponent(GunComponent);

      if (pv && keyboardComponent) {
        let down = this.pressed.get('ArrowDown') == KeyPressType.KEY_DOWN;
        let up = this.pressed.get('ArrowUp') == KeyPressType.KEY_DOWN;
        let left = this.pressed.get('ArrowLeft') == KeyPressType.KEY_DOWN;
        let right = this.pressed.get('ArrowRight') == KeyPressType.KEY_DOWN;

        if (down && !up) {
          pv.velocity.y = keyboardComponent.inputForce.y;
        }

        if (up && !down) {
          pv.velocity.y = -keyboardComponent.inputForce.y;
        }

        if (left && !right) {
          pv.velocity.x = -keyboardComponent.inputForce.x;
        }

        if (right && !left) {
          pv.velocity.x = keyboardComponent.inputForce.x;
        }

        if (Math.abs(pv.velocity.x) == Math.abs(pv.velocity.y)) {
          Vec2dDivMut(pv.velocity, this.squareRoot2) // scales back diagonal movement
        }

        if (gunComp) {
          if (this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
            let diff = gtx.frameClock.now - gunComp.timeSinceLast;
            if (diff > gunComp.shotDelay) {
              ShotArchetype.createNew(
                  gtx,
                  e,
                  {
                    x:  pv.position.x + pv.dimension.x / 2,
                    y:  pv.position.y - pv.dimension.y
                  },
                  {
                    x: 0, 
                    y: gunComp.bulletVelocity
                  },
                  0o0010, 
                  gtx.canvasManager);
              gunComp.timeSinceLast = gtx.frameClock.now;
            }
          }
        }
      }
    }

    this.releaseKeys();
  }
};