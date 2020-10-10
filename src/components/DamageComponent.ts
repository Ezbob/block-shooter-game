import {Entity} from '../dataStructures/Entity';

export class DamageComponent {
  constructor(public damage: number, public dealer: Entity) {}
};