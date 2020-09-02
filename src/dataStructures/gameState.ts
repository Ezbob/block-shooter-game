
export default abstract class GameState {

  protected _isLoaded: boolean = false;

  // single time loading procedure
  load() {
    this._isLoaded = true;
  };

  // per loop update function; calculate positions for the elements of the frame
  // / collision detection
  abstract update(): void;

  // per loop drawing function; do the actual drawing of the frame
  abstract draw(): void;

  // per loop control checker; define the control scheme for this state
  abstract control(): void;

  isLoaded() {
    return this._isLoaded;
  }

}