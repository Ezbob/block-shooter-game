import Constants from '../sharedConstants.js'

export default class GameState {
  constructor(type) {
    // main boolean that determines the activation state of this game state
    this.isPlaying = true;

    // triggered when loading
    this.isLoaded = false;

    this.type = type || Constants.STATE_TYPES.get('action');
  }

  // single time loading procedure
  load() {
    this.isLoaded = true;
  };

  // per loop update function; calculate positions for the elements of the frame
  // / collision detection
  update() {};

  // per loop drawing function; do the actual drawing of the frame
  draw() {};

  // per loop control checker; define the control scheme for this state
  control() {};

  // convenience function for stopping the GameState. This will trigger a pop of
  // the gamestate so that the next game state will begin
  stop() {
    this.isPlaying = false;
  };

  // opposite functionality of the stop function, but calling this does not
  // reseat the state on the gamestate stack
  start() {
    this.isPlaying = true;
  };
}