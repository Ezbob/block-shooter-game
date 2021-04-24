import {ComponentRegistry} from "./ComponentRegistry";

export class Entity {
  readonly id: number;
  private componentRegistry: ComponentRegistry;
  private components: Map<number, any> = new Map();

  constructor(componentRegistry: ComponentRegistry, id: number) {
    this.id = id;
    this.componentRegistry = componentRegistry;
  }

  getComponent(c: ComponentConstructor) {
    let cid = this.componentRegistry.getId(c);
    return this.components.get(cid); 
  }

  removeComponent(...components: ComponentConstructor[]) {
    for (let component of components) {
      let cid = this.componentRegistry.getId(component);
      if (cid) {
        this.components.delete(cid);
      }
    }
  }

  addComponent(...components: ComponentInstance[]) {
    for (let component of components) {
      let componentId = this.componentRegistry.register(component.constructor)
      this.components.set(componentId, component);
    }
  }
};
