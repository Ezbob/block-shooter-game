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

  getComponent(c: ComponentConstructor) {
    let cid = ComponentManager.getId(c);
    return this.components.get(cid); 
  }

  removeComponent(componentId: number) {
    this.components.delete(componentId);
  }

  addComponent(componentInstance: any) {
    this.components.set(componentInstance.cid, componentInstance)
  }
};
