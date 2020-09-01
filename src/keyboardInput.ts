
export default class KeyboardInput {
  private keys: {[key: string]: number} = {
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

  private keyMap: {[key: number]: boolean} = {};

  setup() {
    window.onkeydown = (event: KeyboardEvent) => {
      if (event.keyCode != 123) event.preventDefault();
      this.keyMap[event.keyCode] = (event.type == 'keydown');
    };

    window.onkeyup = (event: KeyboardEvent) => {
      event.preventDefault();
      this.keyMap[event.keyCode] = (event.type == 'keydown');
    };
  };

  isKeyPressed(keyName: string) {
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