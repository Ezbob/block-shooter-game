'use strict';

import Vector2D from './dataStructures/Vector2D';

export default {
  randomBetween(low: number, max: number):
      number {
        return low + Math.floor((Math.random() * max));
      },
  randomFloatBetween(low: number, max: number) {
    return Math.random() * (max - low) + low;
  },
  intersectingRectangles(
      rectA: {position: Vector2D, dimension: Vector2D},
      rectB: {position: Vector2D, dimension: Vector2D}) {
    var ALeft = rectA.position.x;            // x1
    var ARight = ALeft + rectA.dimension.x;  // x1 + w1
    var ATop = rectA.position.y;             // y1
    var ABottom = ATop + rectA.dimension.y;  // y1 + h1

    var BLeft = rectB.position.x;            // x2
    var BRight = BLeft + rectB.dimension.x;  // x2 + w2
    var BTop = rectB.position.y;             // y2
    var BBottom = BTop + rectB.dimension.y;  // y2 + h2

    return !(
        ARight < BLeft || BRight < ALeft || ABottom < BTop || BBottom < ATop);
  }
};