import IComponent from '../dataStructures/IComponent';

export default class GunComponent implements IComponent {
  static cid: number = 8;
  public timeSinceLast = 0;
  constructor(public shotDelay = 150, public bulletVelocity = -12) {}

  get cid() {
    return GunComponent.cid;
  }
};