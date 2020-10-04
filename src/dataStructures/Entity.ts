import {ComponentManager} from "./ComponentManager";

export class Entity {
  readonly id: number;
  public components: Map<number, any> = new Map();

  constructor(id: number, ...args: any) {
    this.id = id;
    for (let c of args) {
      this.components.set(ComponentManager.register(c.constructor), c);
    }
  }

  getComponentByType<T>(c: { new (...arg: any): T }): T | undefined {
    let cid = ComponentManager.getId(c);
    return this.components.get(cid) as T; 
  }

  getComponentById(componentId: number) : any | undefined {
    return this.components.get(componentId);
  }

  hasComponentId(componentId: number) {
    return this.components.has(componentId);
  }

  removeComponentById(componentId: number) {
    this.components.delete(componentId);
  }

  addComponent(componentInstance: any) {
    this.components.set(componentInstance.cid, componentInstance)
  }
};
