import Entity from './entity';

let idGenerator = new class {
  private _id: number;
  constructor() {
    this._id = 0;
  }

  get next() {
    return this._id++;
  }
}

class EntityManager extends Array {
  createNewEntity(...components: any[]) {
    let entity = new Entity(idGenerator.next, ...components);
    this.push(entity);
    return entity;
  }

  getEntitiesByComponents(...componentList: any) {
    let results = [];
    for (let entity of this) {
      if (componentList.length > entity.length) {
        continue;  // entity's component list is not a superset
      }
      let componentSet = new Entity(entity.id);
      let cindex = 0;
      for (let componentType of componentList) {
        for (let component of entity) {
          if (component instanceof componentType) {
            componentSet[cindex] = component;  // using cindex guaranties the
                                               // ordering of the components
          }
        }
        cindex += 1;
      }
      if (componentSet.length === componentList.length) {
        results.push(componentSet);  // we are only interested in components
                                     // that have all of the input components
      }
    }
    return results;
  }
};

export default new EntityManager();