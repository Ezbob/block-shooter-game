
export default class KeyboardInput {
  constructor() {
    this.keys = {
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

    this.keyMap = {};
  }

  setup() {
    window.onkeydown = (event) => {
      event.preventDefault();
      this.keyMap[event.keyCode] = (event.type == 'keydown');
    };

    window.onkeyup = (event) => {
      event.preventDefault();
      this.keyMap[event.keyCode] = (event.type == 'keydown');
    };
  };

  isKeyPressed(keyName) {
    let keyCode = this.keys[keyName];
    if (!keyCode) {
      return false;
    }
    let value = this.keyMap[keyCode];
    if (typeof value == 'undefined') {
      return false;
    }
    return value;
  };
};