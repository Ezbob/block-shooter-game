import ISystem from "../systems/ISystem";

export default abstract class GameState {
  protected systems: ISystem[] = [];
  private _isLoaded: boolean = false;

  // single time loading procedure
  load() {
    this._isLoaded = true;
  };

  isLoaded() {
    return this._isLoaded;
  }

  update() {
    for (let system of this.systems) {
      system.update();
    }
  }
}