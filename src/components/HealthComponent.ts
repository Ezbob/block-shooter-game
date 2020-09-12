import SharedVariables from '../SharedVariables';

export default class HealthComponent {
  static cid: number = SharedVariables.componentIdGenerator.generate();

  constructor(public health: number, public maxHealth: number) {}

  get cid(): number {
    return HealthComponent.cid;
  }
};