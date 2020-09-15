import ShotArchetype from '../archetypes/ShotArchetype';
import DimensionalComponent from '../components/DimensionalComponent';
import GunComponent from '../components/GunComponent';
import KeyboardControllableComponent from '../components/KeyboardControllableComponent';
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
    let entities = EntityManager.filterEntitiesByComponentTypes(
        PositionComponent, KeyboardControllableComponent);

    for (let e of entities) {
      let pv = e.getComponentByType(PositionalComponent);
      let keyboardComponent =
          e.getComponentByType(KeyboardControllableComponent);

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

    entities = EntityManager.filterEntitiesByComponentTypes(
        PositionComponent, DimensionalComponent, GunComponent,
        KeyboardControllableComponent);

    for (let e of entities) {
      let pv = e.getComponentByType(PositionalComponent);
      let dimensionComp = e.getComponentByType(DimensionalComponent);
      let gunComp = e.getComponentByType(GunComponent);

      if (this.pressed.get('Space') == KeyPressType.KEY_PRESS) {
        let diff = SharedVariables.frameClock.now - gunComp.timeSinceLast;
        if (diff > gunComp.shotDelay) {
          ShotArchetype.createNew(
              new Vector2D(
                  pv.position.x + dimensionComp.dimension.x / 2,
                  pv.position.y - dimensionComp.dimension.y),
              new Vector2D(0, gunComp.bulletVelocity), 0o0010);
          gunComp.timeSinceLast = SharedVariables.frameClock.now;
        }
      }
    }

    this.releaseKeys();
  }
};