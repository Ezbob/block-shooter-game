import CircularBuffer from './circularBuffer.js';
import Path from './path.js';

export default class SinePath extends Path {
  constructor(startPoint, endPoint, amplitude, numberOfPoints, numberOfWaves) {
    super(startPoint, endPoint);

    this.points = new CircularBuffer(numberOfPoints);

    // vector going from start to end point
    var displacement = this.end.sub(this.start);
    // the length of the sucker
    var displacementLength = displacement.magnitude();
    // incremental vector used as a stepping stone for calculating the curve
    var normDisplacement = displacement.norm();

    // the 90 ( or PI / 2 ) rotated normalized vector
    var perpendicular = normDisplacement.rotate2d();

    // scales the components
    var distanceScale = displacementLength / (numberOfPoints - 1);
    var sineScale = 2 * Math.PI * (numberOfWaves / numberOfPoints);

    for (var i = 0; i < numberOfPoints; ++i) {
      // the sine value (vertical component)
      var sineValue = amplitude * Math.sin(i * sineScale);

      // move on the horizontal component (along the line)
      var nextOnLine = startPoint.add(normDisplacement.mul(i * distanceScale));

      // move by sine on the vectical component
      var nextPoint = nextOnLine.add(perpendicular.mul(sineValue));

      this.points.push(nextPoint);
    }
  }

  next() {
    return this.points.next();
  };

  prev() {
    return this.points.prev();
  };
}