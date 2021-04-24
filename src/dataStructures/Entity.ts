import {ComponentRegistry} from "./ComponentRegistry";

export class Entity {
  readonly id: number;
  private componentRegistry: ComponentRegistry;
  private components: Map<number, any> = new Map();

  constructor(componentRegistry: ComponentRegistry, id: number,  ...components: any) {
    this.id = id;
    this.componentRegistry = componentRegistry;
    for (let component of components) {
      let componentId = this.componentRegistry.register(component.constructor)
      this.components.set(componentId, component);
    }
  }

  getComponent(c: ComponentConstructor) {
    let cid =  this.componentRegistry.getId(c);
    return this.components.get(cid); 
  }

  removeComponent(componentId: number) {
    this.components.delete(componentId);
  }

  addComponent(componentInstance: any) {
    this.components.set(componentInstance.cid, componentInstance)
  }
};
