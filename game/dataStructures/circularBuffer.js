
export default function CircularBuffer(size, FillPrototype) {
  var me = this;
  me.buffer = [];
  me.size = size || 15;
  me.next_index = 0;

  if (!(typeof FillPrototype == 'undefined' || FillPrototype == null)) {
    for (var i = 0; i < me.size; ++i) {
      me.push(new FillPrototype(arguments.slice(2)));
    }
  }

  me.length = function() {
    return me.buffer.length;
  };

  me.push = function(element) {
    if (me.buffer.length < me.size) {
      me.buffer.push(element);
      return true;
    } else {
      return false;
    }
  };

  me.next = function() {
    var res = me.buffer[me.next_index];
    me.next_index = (me.next_index + 1) % me.buffer.length;
    return res;
  };

  me.prev = function() {
    var res = me.buffer[me.next_index];
    var nexti = (me.next_index - 1) % me.buffer.length;
    me.next_index = nexti < 0 ? me.buffer.length - 1 : nexti;
    return res;
  };

  me.hasNext = function() {
    return me.buffer.length > 0;
  };

  me.reset = function() {
    me.next_index = 0;
  };

  me.forEach = function(mappingFunction) {
    for (var i = 0; i < me.buffer.length; ++i) {
      mappingFunction(me.next(), i);
    }
  };

  me.__proto__.toString = function() {
    return 'CircularBuffer(' + game.utils.stringJoin(', ', me.buffer) + ')';
  };
};