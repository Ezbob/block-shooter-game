
export default function Vector() {
  var me = this;
  me.scalars = [];

  /*
   * This enabled variable arguments for scalars
   */
  for (var i = 0; i < arguments.length; ++i) {
    me.scalars[i] = arguments[i];
  }

  me.getX = function() {
    return me.scalars[0];
  };

  me.getY = function() {
    return me.scalars[1];
  };

  me.getZ = function() {
    return me.scalars[2];
  };

  me.setX = function(x) {
    me.scalars[0] = x;
  };

  me.setY = function(y) {
    me.scalars[1] = y;
  };

  me.setZ = function(z) {
    me.scalars[2] = z;
  };

  me.magnitude = function() {
    var sum = 0;
    for (var i = 0; i < me.scalars.length; ++i) {
      sum += (me.scalars[i] * me.scalars[i]);
    }
    return Math.sqrt(sum);
  };

  me.add = function(other) {
    var res = new Vector();
    for (var i = 0; i < me.scalars.length; ++i) {
      res.scalars[i] = me.scalars[i] + other.scalars[i];
    }
    return res;
  };

  me.addme = function(other) {
    for (var i = 0; i < me.scalars.length; ++i) {
      me.scalars[i] = me.scalars[i] + other.scalars[i];
    }
    return me;
  };

  me.sub = function(other) {
    var res = new Vector();
    for (var i = 0; i < me.scalars.length; ++i) {
      res.scalars[i] = me.scalars[i] - other.scalars[i];
    }
    return res;
  };

  me.subme = function(other) {
    for (var i = 0; i < me.scalars.length; ++i) {
      me.scalars[i] = me.scalars[i] - other.scalars[i];
    }
    return me;
  };

  me.rotateme2d90 = function() {
    me.scalars[0] = me.scalars[1]
    me.scalars[1] = -me.scalars[0]
  };

  me.rotate2d = function() {
    return new Vector(me.scalars[1], -me.scalars[0])
  };

  me.mul = function(scalar) {
    var res = new Vector();
    for (var i = 0; i < me.scalars.length; ++i) {
      res.scalars[i] = me.scalars[i] * scalar;
    }
    return res;
  };

  me.mulme = function(scalar) {
    for (var i = 0; i < me.scalars.length; ++i) {
      me.scalars[i] = me.scalars[i] * scalar;
    }
    return me;
  };

  me.mulmembers = function(other) {
    var res = new Vector();
    for (var i = 0; i < me.scalars.length; ++i) {
      res.scalars[i] = me.scalars[i] * other.scalars[i];
    }
    return res;
  };

  me.norm = function() {
    return me.mul(1 / me.magnitude())
  };

  me.dot = function(other) {
    var res = 0;
    for (var i = 0; i < me.scalars.length; ++i) {
      res += me.scalars[i] * other.scalars[i];
    }
    return res;
  };

  me.equals = function(other) {
    if (me.scalars.length !== other.scalars.length) {
      return false;
    }

    for (var i = 0; i < me.scalars.length; ++i) {
      if (me.scalars[i] !== other.scalars[i]) {
        return false;
      }
    }
    return true;
  };

  me.fromArray = function(array) {
    var res = new Vector();
    res.scalars = array;
    return res;
  };

  me.v = me.fromArray;

  me.__proto__.toString = function() {
    return 'Vector(' + game.utils.stringJoin(', ', me.scalars) + ')';
  }
};