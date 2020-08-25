'use strict';

export default {
  randomBetween(low, max) {
    return low + Math.floor((Math.random() * max));
  },
  randomFloatBetween(low, max) {
    return Math.random() * (max - low) + low;
  },
  intersectingRectangles(rectA, rectB) {
    var ALeft = rectA.position.x;            // x1
    var ARight = ALeft + rectA.dimension.width;   // x1 + w1
    var ATop = rectA.position.y;             // y1
    var ABottom = ATop + rectA.dimension.height;  // y1 + h1

    var BLeft = rectB.position.x;            // x2
    var BRight = BLeft + rectB.dimension.width;   // x2 + w2
    var BTop = rectB.position.y;             // y2
    var BBottom = BTop + rectB.dimension.height;  // y2 + h2

    return !(
        ARight < BLeft || BRight < ALeft || ABottom < BTop || BBottom < ATop);
  }
};