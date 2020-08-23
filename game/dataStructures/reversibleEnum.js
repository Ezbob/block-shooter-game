
export default function ReversibleEnum() {
  var me = this;
  me.map = {};
  me.reverseMap = {};

  for (var i = 0; i < arguments.length; ++i) {
    me.map[arguments[i]] = i;
  }

  var keys = Object.keys(me.map);

  for (var i = 0; i < keys.length; ++i) {
    var currkey = keys[i];
    me.reverseMap[me.map[currkey]] = currkey;
  }

  me.get = function(key) {
    return typeof me.map[key] === 'undefined' ? -1 : me.map[key];
  };

  me.getReverse = function(value) {
    return me.reverseMap[value] || 'unknown';
  };
};