
export default class Entity extends Array {
  constructor(id, ...args) {
    super(...args);
    this.id = id;
  }
};

