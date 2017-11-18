BOXED_GAME.dataStructures = (function(game) {
  var exportObj = {
    Vector: function() { 
      var me = this; 
      me.scalars = [];

      for (var i = 0; i < arguments.length; ++i) {
        me.scalars[i] = arguments[i];
      }

      me.getX = function() {
        return me.scalars[0];
      }

      me.getY = function() {
        return me.scalars[1];
      }

      me.getZ = function() {
        return me.scalars[2];
      }

      me.setX = function(x) {
        me.scalars[0] = x;
      }

      me.setY = function(y) {
        me.scalars[1] = y;
      }

      me.setZ = function(z) {
        me.scalars[2] = z;
      }

      me.magnitude = function() {
        var sum = 0;
        for (var i = 0; i < me.scalars.length; ++i) {
          sum += (me.scalars[i] * me.scalars[i]);
        }
        return Math.sqrt(sum);
      }

      me.add = function(other) { 
        var res = new game.dataStructures.Vector(); 
        for (var i = 0; i < me.scalars.length; ++i) { 
          res.scalars[i] = me.scalars[i] + other.scalars[i]; 
        }
        return res; 
      }

      me.addme = function(other) {  
        for (var i = 0; i < me.scalars.length; ++i) { 
          me.scalars[i] = me.scalars[i] + other.scalars[i]; 
        }
        return me; 
      }

      me.sub = function(other) {
        var res = new game.dataStructures.Vector(); 
        for (var i = 0; i < me.scalars.length; ++i) { 
          res.scalars[i] = me.scalars[i] - other.scalars[i]; 
        }
        return res; 
      }

      me.subme = function(other) { 
        for (var i = 0; i < me.scalars.length; ++i) { 
          me.scalars[i] = me.scalars[i] - other.scalars[i]; 
        }
        return me; 
      }

      me.rotateme2d90 = function() {
        me.scalars[0] = me.scalars[1]
        me.scalars[1] = -me.scalars[0]
      }

      me.rotate2d = function() {
        return new game.dataStructures.Vector(me.scalars[1], -me.scalars[0])
      }

      me.mul = function(scalar) {
        var res = new game.dataStructures.Vector();
        for (var i = 0; i < me.scalars.length; ++i) { 
          res.scalars[i] = me.scalars[i] * scalar; 
        }
        return res; 
      }

      me.mulme = function(scalar) {
        for (var i = 0; i < me.scalars.length; ++i) { 
          me.scalars[i] = me.scalars[i] * scalar; 
        }
        return me;
      }

      me.mulmembers = function(other) {
        var res = new game.dataStructures.Vector();
        for (var i = 0; i < me.scalars.length; ++i) {
          res.scalars[i] = me.scalars[i] * other.scalars[i];
        }
        return res;
      }

      me.norm = function() {
        return me.mul(1 / me.magnitude())
      }

      me.dot = function(other) {
        var res = 0;
        for ( var i = 0; i < me.scalars.length; ++i ) {
          res += me.scalars[i] * other.scalars[i];
        }
        return res;
      }

      me.equals = function(other) {
        if ( me.scalars.length !== other.scalars.length ) {
          return false;
        }

        for ( var i = 0; i < me.scalars.length; ++i ) {
          if ( me.scalars[i] !== other.scalars[i] ) {
            return false;
          }
        }
        return true;
      }
    },

    ReversableEnum: function() {
      var me = this;
      me.map = {};
      me.reverseMap = {};

      for (var i = 0; i < arguments.length; ++i) {
        me.map[arguments[i]] = i;
      }

      var keys = Object.keys(me.map);

      for ( var i = 0; i < keys.length; ++i ) {
        var currkey = keys[i];
        me.reverseMap[me.map[currkey]] = currkey;
      }

      me.get = function(key) {
        return typeof me.map[key] === "undefined" ? -1 : me.map[key];
      }

      me.getReverse = function(value) {
        return me.reverseMap[value] || 'unknown';
      }
    },

    CircularBuffer: function(size, FillPrototype) {
      var me = this;
      var utils = game.utils;
      me.buffer = [];
      me.size = size || 15;
      me.next_index =  0;

      if ( !(typeof FillPrototype == "undefined" || FillPrototype == null ) ) {
        for (var i = 0; i < me.size; ++i) {
          me.push(new FillPrototype(arguments.slice(2)));
        }
      }

      me.length = function() {
        return me.buffer.length;
      };

      me.push = function(element) {
        if ( me.buffer.length < me.size ) {
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
    },

    Entity: function(type, position, dimension, velocity) {
      var me = this;
      var x;
      me.type = typeof type == "number" && (x = Math.floor(type)) === type ? x : -1;
      me.position = position || new game.dataStructures.Vector(0,0);
      me.dimension = dimension || { width: 0, height: 0 };
      me.velocity = velocity || new game.dataStructures.Vector(0,0);

      me.draw = function() { console.log("Draw not implemented"); }
      me.update = function() { console.log("Update not implemented"); }
      me.isEnabled = function() { console.log("isEnabled not implemented"); return false; }
    }
  };

  exportObj.CircularBuffer.prototype.toString = function vectorToString() {
    var me = this;
    var stringRepr = "CircularBuffer(";

    for (var i = 0; i < me.buffer.length - 1; ++i) {
      stringRepr += me.buffer[i] + ", ";
    }
    stringRepr += me.buffer[me.buffer.length - 1];

    return stringRepr + ")"; 
  }

  exportObj.Vector.fromArray = function(array) {
    var res = new exportObj.Vector();
    res.scalars = array;
    return res;
  }

  exportObj.Vector.v = exportObj.Vector.fromArray;

  exportObj.Vector.prototype.toString = function vectorToString() {
    var me = this;
    var stringRepr = "Vector(";

    for (var i = 0; i < me.scalars.length - 1; ++i) {
      stringRepr += me.scalars[i] + ", ";
    }
    stringRepr += me.scalars[me.scalars.length - 1];

    return stringRepr + ")"; 
  }

  return exportObj;

})(BOXED_GAME);