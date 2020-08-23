import Variables from '../sharedVariables.js'
import Constants from '../sharedConstants.js'

export default function GameState(type) {
  var me = this;

  // main boolean that determines the activation state of this game state
  me.isPlaying = true;

  me.type = type || Constants.STATE_TYPES.get('action');

  // single time loading procedure
  me.load = function() {};

  // per loop update function; calculate positions for the elements of the frame
  // / collision detection
  me.update = function() {};

  // per loop drawing function; do the actual drawing of the frame
  me.draw = function() {};

  // per loop control checker; define the control scheme for this state
  me.control = function() {};

  // convience function for stopping the GameState. This will trigger a pop of
  // the gamestate so that the next game state will begin
  me.stop = function() {
    me.isPlaying = false;
  };

  // opposite functionality of the stop function, but calling this does not
  // reseat the state on the gamestate stack
  me.start = function() {
    me.isPlaying = true;
  };
}