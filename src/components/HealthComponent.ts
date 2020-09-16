
export default class HealthComponent {
  static cid: number = 9;

  constructor(public health: number, public maxHealth: number) {}

  get cid(): number {
    return HealthComponent.cid;
  }
};