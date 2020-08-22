!function(e){var t={};function a(n){if(t[n])return t[n].exports;var r=t[n]={i:n,l:!1,exports:{}};return e[n].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)a.d(n,r,function(t){return e[t]}.bind(null,r));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";a.r(t);let n={constants:{CANVAS_HTML_ID:"playground",DEBUG_ON:!1,CANVAS_WIDTH:1080,MAX_SHOTS:300,MAX_ENEMIES:25,DIRECTION:1,BASE_VELOCITY:{x:2,y:2},TRAVEL_VELOCITY:.45,FPS_LIMIT:140,NUMBER_OF_CLOUDS:30,KEYS:{left:37,up:38,right:39,down:40,z:90,x:88,space:32,enter:13,control:17,alt:18,escape:27},ENTITY_TYPES:new game.dataStructures.ReversableEnum("enemy","cloud","shot","player","uiProp"),SCENARIO_TYPES:new game.dataStructures.ReversableEnum("destroyall","timeout"),STATE_TYPES:new game.dataStructures.ReversableEnum("pause","action","intro")},variables:{lastUpdate:0,now:0,dt:0,clouds:new game.dataStructures.CircularBuffer(game.constants.NUMBER_OF_CLOUDS),shots:new game.dataStructures.CircularBuffer(game.constants.MAX_SHOTS),scenarios:[],stateStack:[],keyMap:[],isPaused:!1,scheduler:new game.dataStructures.Scheduler}};var r=n.constants;r.CANVAS_HEIGHT=r.CANVAS_WIDTH/12*9,r.CANVAS=document.getElementById(r.CANVAS_HTML_ID),r.CONTEXT2D=r.CANVAS.getContext("2d"),r.CANVAS.setAttribute("width",r.CANVAS_WIDTH),r.CANVAS.setAttribute("height",r.CANVAS_HEIGHT);var o,s=n;o=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/s.constants.FPS_LIMIT)},s.variables.getCurrentGameState().load(),o((function e(){s.variables.now=window.performance.now(),s.variables.dt=game.variables.now-(game.variables.lastUpdate||game.variables.now),s.variables.lastUpdate=game.variables.now,s.constants.CONTEXT2D.clearRect(0,0,s.constants.CANVAS_WIDTH,s.constants.CANVAS_HEIGHT);var t=s.variables.getCurrentGameState();if(t.control(),t.update(),t.draw(),!t.isPlaying){if(s.constants.CONTEXT2D.clearRect(0,0,s.constants.CANVAS_WIDTH,s.constants.CANVAS_HEIGHT),!(s.variables.stateStack.length>0))return;s.variables.stateStack.pop(),(t=s.variables.getCurrentGameState()).load()}o(e)}))}]);
//# sourceMappingURL=bundle.js.map