
export default class Entity extends Array {
  readonly id: number;
  constructor(id: number, ...args: any[]) {
    super(...args);
    this.id = id;
  }

  addComponent(comp: any) {
    this.push(comp);
  }

  removeComponent(compType: any) {
    let index = 0;
    for (let component of this) {
      if (component instanceof compType) {
        this.splice(index, 1);
        break;
      }
      index += 1;
    }
  }
};
