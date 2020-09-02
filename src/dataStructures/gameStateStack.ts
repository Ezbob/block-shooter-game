import GameState from './gameState';

export default class GameStateStack extends Array {
  private stoppedStages: GameState[];

  getCurrentGameState(): GameState | null {
    // if stateStack is empty then we get a generic gamestate that has the
    // isPlaying flag set to false so this gamestate automatically stops the
    // stack machinery
    return this.length > 0 ? this[this.length - 1] : null;
  };

  haltCurrentGameState() {
    let current = this.pop();
    if (current) {
      this.stoppedStages.push(current)
    }
  }

  startFromLastHaltedGameState() {
    let halted = this.stoppedStages.pop()
    if (halted) {
      this.push(halted)
    }
  }
}