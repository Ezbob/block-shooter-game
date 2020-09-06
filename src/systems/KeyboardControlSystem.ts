import ShotArchetype from '../archetypes/ShotArchetype';
import KeyboardControllableComponent from '../components/KeyboardControllableComponent';
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
    let entities = EntityManager.getEntitiesByComponentIds(
        PositionComponent.cid, KeyboardControllableComponent.cid);

    for (let e of entities) {
      let pv = e.getComponentById(PositionalComponent.cid) as PositionComponent;
      let keyboardComponent = e.getComponentById(KeyboardControllableComponent.cid) as KeyboardControllableComponent;

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

    entities = EntityManager.getEntitiesByComponentIds(
        PositionComponent.cid, DimensionalComponent.cid, GunComponent.cid,
        KeyboardControllableComponent.cid);

    for (let e of entities) {
      let pv = e.getComponentById(PositionalComponent.cid) as PositionComponent;
      let dimenComp = e.getComponentById(DimensionalComponent.cid) as DimensionalComponent;
      let gunComp = e.getComponentById(GunComponent.cid) as GunComponent;
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