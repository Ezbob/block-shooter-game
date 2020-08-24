import Vector from '../dataStructures/vector.js';

export default class Entity {
  constructor(type, position, dimension, velocity) {
    var me = this;
    var x;
    me.type =
        typeof type == 'number' && (x = Math.floor(type)) === type ? x : -1;
    me.position = position || new Vector(0, 0);
    me.dimension = dimension || {width: 0, height: 0};
    me.velocity = velocity || new Vector(0, 0);
  }

  draw() {
    console.error('Draw not implemented');
  }
  update() {
    console.error('Update not implemented');
  }
  isEnabled() {
    console.error('isEnabled not implemented');
    return false;
  };
};
