export default function Entity(type, position, dimension, velocity) {
  var me = this;
  var x;
  me.type = typeof type == 'number' && (x = Math.floor(type)) === type ? x : -1;
  me.position = position || new Vector(0, 0);
  me.dimension = dimension || {width: 0, height: 0};
  me.velocity = velocity || new Vector(0, 0);

  me.draw = function() {
    console.error('Draw not implemented');
  };
  me.update = function() {
    console.error('Update not implemented');
  };
  me.isEnabled = function() {
    console.error('isEnabled not implemented');
    return false;
  };
};
