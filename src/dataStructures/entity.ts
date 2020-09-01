
export default class Entity extends Array {
  readonly id: number;
  constructor(id: number, ...args: any[]) {
    super(...args);
    this.id = id;
  }
};

