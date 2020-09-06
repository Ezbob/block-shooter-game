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

  getEntitiesByComponentIds(...componentIds: number[]): Entity[] {
    let results = [];
    for (let entity of this) {
      if (componentIds.length > entity.components.size) {
        continue;  // entity's component list is not a superset
      }
      if (componentIds.every((cid => entity.components.has(cid)))) {
        results.push(entity)
      }
    }
    return results;
  }
};

export default new EntityManager();