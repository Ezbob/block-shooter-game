export default function Path(startPoint, endPoint) {
  var me = this;
  me.end = endPoint;
  me.start = startPoint;

  me.next = function() {
    return null;
  };
  me.prev = function() {
    return null;
  };
}