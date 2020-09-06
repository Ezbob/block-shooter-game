import Entity from './Entity';

class EntityManager extends Array<Entity> {
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

  filterEntitiesByComponentTypes(...componentTypes: { new(): any, cid: number }[]): Entity[] {
    let results = [];
    for (let entity of this) {
      if (componentTypes.length > entity.components.size) {
        continue;  // entity's component list is not a superset
      }
      if (componentTypes.every((c => entity.components.has(c.cid)))) {
        results.push(entity)
      }
    }
    return results;
  }
};

export default new EntityManager();