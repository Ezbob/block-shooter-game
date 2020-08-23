"use strict";
import sharedData from './sharedData.js';
import utils from './utils.js';
import Vector from './dataStructures/vector.js';
import Cloud from './dataStructures/cloud.js';

BOXED_GAME.backDrops = (function(game) {
  var consts = sharedData.constants;
  var clouds = sharedData.variables.clouds;

  function loadClouds() {
    for ( var i = 0; i < game.constants.NUMBER_OF_CLOUDS; ++i ) {
      clouds.push(
        new Cloud(
          { width: 20, height: 20 }, 
          new Vector(utils.randomBetween(1, consts.CANVAS_WIDTH - 1), utils.randomBetween(-15, consts.CANVAS_HEIGHT >> 1))
        )
      );
    }
  }
  
  return { 
    loadClouds: loadClouds 
  };
}(BOXED_GAME));