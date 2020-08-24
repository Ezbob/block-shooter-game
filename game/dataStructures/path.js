export default class Path {
  constructor(startPoint, endPoint) {
    this.end = endPoint;
    this.start = startPoint;
  }

  next() {
    return null;
  };

  prev() {
    return null;
  };
}