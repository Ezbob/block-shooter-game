import ShotArchetype from '../archetypes/ShotArchetype';
import GunComponent from '../components/GunComponent';
import KeyboardControllableComponent from '../components/KeyboardControllableComponent';

import PositionalComponent from '../components/PositionalComponent';
import EntityManager from '../dataStructures/EntityManager';
import Vector2D from '../dataStructures/Vector2D';
import SharedVariables from '../SharedVariables';

import ISystem from './ISystem';

enum KeyPressType {
  NO_KEY,
  KEY_DOWN,
  KEY_UP,
  KEY_PRESS
}

export default class KeyboardControlSystem implements ISystem {
  constructor() {
    window.onkeydown = window.onkeyup = window.onkeypress =
        this.onEvent.bind(this)
  }

  private pressed: Map<string, KeyPressType> = new Map<string, KeyPressType>();

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

  update() {
    for (let e of EntityManager) {
      let pv = e.getComponentByType(PositionalComponent);
      let keyboardComponent =
          e.getComponentByType(KeyboardControllableComponent);
      let gunComp = e.getComponentByType(GunComponent);

      if (pv && keyboardComponent) {
        let down = this.pressed.get('ArrowDown') == KeyPressType.KEY_DOWN;
        let up = this.pressed.get('ArrowUp') == KeyPressType.KEY_DOWN;
        let left = this.pressed.get('ArrowLeft') == KeyPressType.KEY_DOWN;
        let right = this.pressed.get('ArrowRight') == KeyPressType.KEY_DOWN;

        if (down) {
          pv.velocity.y = keyboardComponent.inputForce.y;
        }

        if (up) {
          pv.velocity.y = -keyboardComponent.inputForce.y;
        }

        if (left) {
          pv.velocity.x = -keyboardComponent.inputForce.x;
        }

        if (right) {
          pv.velocity.x = keyboardComponent.inputForce.x;
        }

        if (gunComp) {
          if (this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
            let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
            if (diff > gunComp.shotDelay) {
              ShotArchetype.createNew(
                  e,
                  new Vector2D(
                      pv.position.x + pv.dimension.x / 2,
                      pv.position.y - pv.dimension.y),
                  new Vector2D(0, gunComp.bulletVelocity), 0o0010);
              gunComp.timeSinceLast = SharedVariables.frameClock.now;
            }
          }
        }
      }
    }

    this.releaseKeys();
  }
};