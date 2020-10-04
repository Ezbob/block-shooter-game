import {Entity} from './Entity';

export const EntityManager = new class extends Array<Entity> {
  private nextId: number = 0;

  private getNextId(): number {
    return this.nextId++;
  }

  createNewEntity(...components: any[]) {
    let entity = new Entity(this.getNextId(), ...components);
    this.push(entity);
    return entity;
  }

  deleteEntity(entityId: number) {
    let index = this.findIndex(entity => entity.id === entityId);
    if (index != -1) this.splice(index, 1);
  }
};
