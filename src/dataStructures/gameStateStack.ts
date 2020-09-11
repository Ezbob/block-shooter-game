import GameState from './GameState';

export default class GameStateStack {
  private stoppedStages: GameState[] = [];
  private activeStages: GameState[] = [];

  getCurrentGameState(): GameState | null {
    return this.activeStages.length > 0 ? this.activeStages[this.activeStages.length - 1] : null;
  };

  haltCurrentGameState() {
    let current = this.activeStages.pop();
    if (current) {
      this.stoppedStages.push(current)
    }
  }

  startFromLastHaltedGameState() {
    let halted = this.stoppedStages.pop()
    if (halted) {
      this.activeStages.push(halted)
    }
  }

  pushState(gs: GameState) {
    this.activeStages.push(gs)
  }

  popState() {
    this.activeStages.pop()
  }
}