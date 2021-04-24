import { ComponentRegistry } from './ComponentRegistry';
import {Entity} from './Entity';

export class EntityManager {
  private nextId: number = 0;
  private entities: Entity[] = []

  constructor(private componentRegistry: ComponentRegistry) {}

  private getNextId(): number {
    return this.nextId++;
  }

  public createEntity(...components: any[]) {
    let entity = new Entity(this.componentRegistry, this.getNextId());
    entity.addComponent(...components)
    this.entities.push(entity);
    return entity;
  }

  public deleteEntity(entityId: number) {
    let index = this.entities.findIndex(entity => entity.id === entityId);
    if (index != -1) {
      this.entities.splice(index, 1);
    }
  }

  get data() {
    return this.entities
  }

  get length() {
    return this.entities.length
  }

  *[Symbol.iterator](): Generator<Entity> {
    for (let e of this.entities) {
      yield e
    }
  }
};
