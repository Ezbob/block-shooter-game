import ShotArchetype from '../archetypes/ShotArchetype';
import KeyboardControllableComponent from '../components/controllableComponent';
import DimensionalComponent from '../components/DimensionalComponent';
import GunComponent from '../components/GunComponent';
import PositionComponent from '../components/PositionalComponent';
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
    let entities = EntityManager.getEntitiesByComponents(
        PositionComponent, KeyboardControllableComponent);

    for (let e of entities) {
      let pv = e[0] as PositionComponent;
      let keyboardComponent = e[1] as KeyboardControllableComponent;

      if (this.pressed.get('ArrowDown') == KeyPressType.KEY_DOWN) {
        pv.velocity.y = keyboardComponent.inputForce.y;
      }

      if (this.pressed.get('ArrowUp') == KeyPressType.KEY_DOWN) {
        pv.velocity.y = -keyboardComponent.inputForce.y;
      }

      if (this.pressed.get('ArrowLeft') == KeyPressType.KEY_DOWN) {
        pv.velocity.x = -keyboardComponent.inputForce.x;
      }

      if (this.pressed.get('ArrowRight') == KeyPressType.KEY_DOWN) {
        pv.velocity.x = keyboardComponent.inputForce.x;
      }
    }

    entities = EntityManager.getEntitiesByComponents(
        PositionComponent, DimensionalComponent, GunComponent,
        KeyboardControllableComponent);

    for (let e of entities) {
      let pv = e[0] as PositionalComponent;
      let dimenComp = e[1] as DimensionalComponent;
      let gunComp = e[2] as GunComponent;
      if (this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
        let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
        if (diff > gunComp.shotDelay) {
          ShotArchetype.createNew(
              new Vector2D(
                  pv.position.x + dimenComp.dimension.x / 2,
                  pv.position.y - dimenComp.dimension.y),
              new Vector2D(0, -8));
          gunComp.timeSinceLast = SharedVariables.frameClock.now;
        }
      }
    }

    this.releaseKeys();
  }
};