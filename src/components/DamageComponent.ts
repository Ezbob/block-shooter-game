import Entity from "../dataStructures/Entity";


export default class DamageComponent {
  constructor(public damage: number, public dealer: Entity) {}
};