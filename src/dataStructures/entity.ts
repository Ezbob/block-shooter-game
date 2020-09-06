import IComponent from "./IComponent";


export default class Entity {
  readonly id: number;
  public components: Map<number, IComponent> = new Map();

  constructor(id: number, ...args: IComponent[]) {
    this.id = id;
    for (let c of args) {
      this.components.set(c.cid, c);
    }
  }

  getComponentById(componentId: number) {
    return this.components.get(componentId);
  }

  hasComponentId(componentId: number) {
    return this.components.has(componentId);
  }

  removeComponentById(componentId: number) {
    this.components.delete(componentId);
  }

  addComponent(componentInstance: IComponent) {
    this.components.set(componentInstance.cid, componentInstance)
  }
};
