import IComponent from '../dataStructures/IComponent';

export default class AutoShootComponent implements IComponent {
  static cid: number = 0;
  constructor(public isShooting = true) {}

  get cid() {
    return AutoShootComponent.cid;
  }
}