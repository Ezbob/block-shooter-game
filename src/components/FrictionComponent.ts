import IComponent from '../dataStructures/IComponent';

export default class FrictionComponent implements IComponent {
  static cid: number = 7;

  constructor(public frictionBreakingForce = 0.5) {}

  get cid() {
    return FrictionComponent.cid;
  }
}