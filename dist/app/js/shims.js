// RAF shim
// @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
"use strict";

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();