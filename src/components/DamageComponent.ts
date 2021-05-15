import {Entity} from 'escarole';

export class DamageComponent {
  constructor(public damage: number, public dealer: Entity) {}
};