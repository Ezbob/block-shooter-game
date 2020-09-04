import KeyboardControllableComponent from '../components/controllableComponent';
import PositionComponent from '../components/positionalComponent';
import entityManager from '../dataStructures/entityManager';
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

  private pressed: {[key: string]: KeyPressType} = {};

  onEvent(event: KeyboardEvent) {
    switch (event.type) {
      case 'keydown':
        this.pressed[event.code] = KeyPressType.KEY_DOWN;
        break;
      case 'keyup':
        this.pressed[event.code] = KeyPressType.KEY_UP;
        break;
      case 'keypress':
        this.pressed[event.code] = KeyPressType.KEY_PRESS;
        break;
      default:
        this.pressed[event.code] = KeyPressType.NO_KEY;
        break;
    }
  }

  releaseKeys() {
    for (let key in this.pressed) {
      if (this.pressed[key] === KeyPressType.KEY_UP) {
        this.pressed[key] = KeyPressType.NO_KEY;
      }
    }
  }

  update() {
    let entities = entityManager.getEntitiesByComponents(
        PositionComponent, KeyboardControllableComponent);

    for (let [pv, keyboardComponent] of entities) {
      if (this.pressed['ArrowDown'] == KeyPressType.KEY_DOWN) {
        pv.velocity.y = keyboardComponent.inputForce.y;
      }
      if (this.pressed['ArrowUp'] == KeyPressType.KEY_DOWN) {
        pv.velocity.y = -keyboardComponent.inputForce.y;
      }

      if (this.pressed['ArrowLeft'] == KeyPressType.KEY_DOWN) {
        pv.velocity.x = -keyboardComponent.inputForce.x;
      }

      if (this.pressed['ArrowRight'] == KeyPressType.KEY_DOWN) {
        pv.velocity.x = keyboardComponent.inputForce.x;
      }
    }

    this.releaseKeys()
  }
};