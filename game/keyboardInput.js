
export default function KeyboardInput() {
  var me = this;

  me.keys = {
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    z: 90,
    x: 88,
    space: 32,
    enter: 13,
    control: 17,
    alt: 18,
    escape: 27
  };

  me.keyMap = {};

  me.setup = function() {
    window.onkeydown = function(event) {
      event.preventDefault();
      me.keyMap[event.keyCode] = (event.type == 'keydown');
    };

    window.onkeyup = function(event) {
      event.preventDefault();
      me.keyMap[event.keyCode] = (event.type == 'keydown');
    };
  };

  me.isKeyPressed = function(keyName) {
    let keyCode = me.keys[keyName];
    if (!keyCode) {
      return false;
    }
    let value = me.keyMap[keyCode]
    if (typeof value == "undefined") {
      return false;
    }
    return value
  };
};