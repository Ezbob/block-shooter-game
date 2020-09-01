import GameState from './gameState';

class DummyState extends GameState {
  constructor() {
    super();
    this.isPlaying = false;
  }
  update(): void {}
  draw(): void {}
  control(): void {}
}

export default class GameStateStack extends Array {
  getCurrentGameState() {
    // if stateStack is empty then we get a generic gamestate that has the
    // isPlaying flag set to false so this gamestate automatically stops the
    // stack machinery
    return this.length > 0 ? this[this.length - 1] : new DummyState();
  };
}