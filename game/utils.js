'use strict';

let utils = {
  randomBetween: function(low, max) {
    return low + Math.floor((Math.random() * max));
  },
  randomFloatBetween: function(low, max) {
    return Math.random() * (max - low) + low;
  },
  intersectingRectangles: function(rectA, rectB) {
    var ALeft = rectA.position.getX();            // x1
    var ARight = ALeft + rectA.dimension.width;   // x1 + w1
    var ATop = rectA.position.getY();             // y1
    var ABottom = ATop + rectA.dimension.height;  // y1 + h1

    var BLeft = rectB.position.getX();            // x2
    var BRight = BLeft + rectB.dimension.width;   // x2 + w2
    var BTop = rectB.position.getY();             // y2
    var BBottom = BTop + rectB.dimension.height;  // y2 + h2

    return !(
        ARight < BLeft || BRight < ALeft || ABottom < BTop || BBottom < ATop);
  },
  stringJoin: function(delimiter) {
    if (arguments.length < 2 || arguments[1].length === 0) {
      return '';
    }
    var array = arguments[1];
    var res = '' + array[0];
    for (var i = 1; i < array.length; i++) {
      res += delimiter + array[i];
    }
    return res;
  },
  puts: function() {
    // converts objects to string representation and prints out to console
    // useful for debugging objects with custom toString
    var strings = Array.prototype.map.call(arguments, function(obj) {
      return '' + obj;
    });
    console.log(console, strings);
  }
};

export default utils;