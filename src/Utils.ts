
export const Utils = {
  randomBetween(low: number, max: number): number {
    return low + Math.floor((Math.random() * max));
  },
  randomFloatBetween(low: number, max: number) {
    return Math.random() * (max - low) + low;
  },
  intersectingRectangles(
      rectA: {position: MathVector2d, dimension: MathVector2d},
      rectB: {position: MathVector2d, dimension: MathVector2d}) {
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
  },
  intersectingRectanglesFlat(
      positionA: MathVector2d, dimensionA: MathVector2d, positionB: MathVector2d,
      dimensionB: MathVector2d) {
    var ALeft = positionA.x;            // x1
    var ARight = ALeft + dimensionA.x;  // x1 + w1
    var ATop = positionA.y;             // y1
    var ABottom = ATop + dimensionA.y;  // y1 + h1

    var BLeft = positionB.x;            // x2
    var BRight = BLeft + dimensionB.x;  // x2 + w2
    var BTop = positionB.y;             // y2
    var BBottom = BTop + dimensionB.y;  // y2 + h2

    return !(
        ARight < BLeft || BRight < ALeft || ABottom < BTop || BBottom < ATop);
  },
  promiseLoadImage(url: string, width: number = undefined, height: number = undefined): Promise<HTMLImageElement> {
    return new Promise(( resolve, reject ) => {
       let image = new Image(width, height)
       image.onload = () => {
          resolve(image)
       }
       image.onabort = () => {
          reject(null)
       }
       image.src = url
    })
  }
};