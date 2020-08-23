import CircularBuffer from './circularBuffer.js';
import Path from './path.js';

export default function SinePath(
    startPoint, endPoint, amplitude, numberOfPoints, numberOfWaves) {
  var me = this;
  me.__proto__ = new Path(startPoint, endPoint);

  me.points = new CircularBuffer(numberOfPoints);

  // vector going from start to end point
  var displacement = me.end.sub(me.start);
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

    me.points.push(nextPoint);
  }

  /*
      Calculate the path using simple linear algebra, and buffer the results
  */
  me.next = function() {
    return me.points.next();
  };

  me.prev = function() {
    return me.points.prev();
  };
}