import {ComponentRegistry} from "./ComponentRegistry";

export class Entity {
  readonly id: number;
  private componentRegistry: ComponentRegistry;
  private components: Map<number, any> = new Map();

  constructor(componentRegistry: ComponentRegistry, id: number, ...components: ComponentInstance[]) {
    this.id = id;
    this.componentRegistry = componentRegistry;
    for (let component of components) {
      this.addComponent(component)
    }
  }

  getComponent(c: ComponentConstructor) {
    let cid = this.componentRegistry.getId(c);
    return this.components.get(cid); 
  }

  removeComponent(component: ComponentInstance) {
    let cid = this.componentRegistry.getId(component.constructor);
    this.components.delete(cid);
  }

  addComponent(component: ComponentInstance) {
    let componentId = this.componentRegistry.register(component.constructor)
    this.components.set(componentId, component);
  }
};
