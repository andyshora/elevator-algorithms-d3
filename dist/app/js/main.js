/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

'use strict';

Detector = {

  canvas: !!window.CanvasRenderingContext2D,
  webgl: (function () {
    try {
      return !!window.WebGLRenderingContext && !!document.createElement('canvas').getContext('experimental-webgl');
    } catch (e) {
      return false;
    }
  })(),
  workers: !!window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,

  getWebGLErrorMessage: function getWebGLErrorMessage() {

    var element = document.createElement('div');
    element.id = 'webgl-error-message';
    element.style.fontFamily = 'monospace';
    element.style.fontSize = '13px';
    element.style.fontWeight = 'normal';
    element.style.textAlign = 'center';
    element.style.background = '#fff';
    element.style.color = '#000';
    element.style.padding = '1.5em';
    element.style.width = '400px';
    element.style.margin = '5em auto 0';

    if (!this.webgl) {

      element.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n') : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join('\n');
    }

    return element;
  },

  addGetWebGLMessage: function addGetWebGLMessage(parameters) {

    var parent, id, element;

    parameters = parameters || {};

    parent = parameters.parent !== undefined ? parameters.parent : document.body;
    id = parameters.id !== undefined ? parameters.id : 'oldie';

    element = Detector.getWebGLErrorMessage();
    element.id = id;

    parent.appendChild(element);
  }

};
// RAF shim
// @see http://paulirish.com/2011/requestanimationframe-for-smart-animating/
"use strict";

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
    window.setTimeout(callback, 1000 / 60);
  };
})();
// stats.js - http://github.com/mrdoob/stats.js
"use strict";

var Stats = function Stats() {
  var l = Date.now(),
      m = l,
      g = 0,
      n = Infinity,
      o = 0,
      h = 0,
      p = Infinity,
      q = 0,
      r = 0,
      s = 0,
      f = document.createElement("div");f.id = "stats";f.addEventListener("mousedown", function (b) {
    b.preventDefault();t(++s % 2);
  }, !1);f.style.cssText = "width:80px;opacity:0.9;cursor:pointer";var a = document.createElement("div");a.id = "fps";a.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#002";f.appendChild(a);var i = document.createElement("div");i.id = "fpsText";i.style.cssText = "color:#0ff;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";
  i.innerHTML = "FPS";a.appendChild(i);var c = document.createElement("div");c.id = "fpsGraph";c.style.cssText = "position:relative;width:74px;height:30px;background-color:#0ff";for (a.appendChild(c); 74 > c.children.length;) {
    var j = document.createElement("span");j.style.cssText = "width:1px;height:30px;float:left;background-color:#113";c.appendChild(j);
  }var d = document.createElement("div");d.id = "ms";d.style.cssText = "padding:0 0 3px 3px;text-align:left;background-color:#020;display:none";f.appendChild(d);var k = document.createElement("div");
  k.id = "msText";k.style.cssText = "color:#0f0;font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px";k.innerHTML = "MS";d.appendChild(k);var e = document.createElement("div");e.id = "msGraph";e.style.cssText = "position:relative;width:74px;height:30px;background-color:#0f0";for (d.appendChild(e); 74 > e.children.length;) j = document.createElement("span"), j.style.cssText = "width:1px;height:30px;float:left;background-color:#131", e.appendChild(j);var t = function t(b) {
    s = b;switch (s) {case 0:
        a.style.display = "block";d.style.display = "none";break;case 1:
        a.style.display = "none", d.style.display = "block";}
  };return { REVISION: 11, domElement: f, setMode: t, begin: function begin() {
      l = Date.now();
    }, end: function end() {
      var b = Date.now();g = b - l;n = Math.min(n, g);o = Math.max(o, g);k.textContent = g + " MS (" + n + "-" + o + ")";var a = Math.min(30, 30 - 30 * (g / 200));e.appendChild(e.firstChild).style.height = a + "px";r++;b > m + 1E3 && (h = Math.round(1E3 * r / (b - m)), p = Math.min(p, h), q = Math.max(q, h), i.textContent = h + " FPS (" + p + "-" + q + ")", a = Math.min(30, 30 - 30 * (h / 100)), c.appendChild(c.firstChild).style.height = a + "px", m = b, r = 0);return b;
    }, update: function update() {
      l = this.end();
    } };
};
'use strict';

var app = angular.module('WorldViewerApp', ['ngResource', 'jsonFormatter']);

app.config(function ($httpProvider) {
  // required for REST API
  $httpProvider.defaults.headers.common.Accept = 'application/json';
});

app.controller('MainCtrl', function ($scope, $resource, $http) {

  $scope.controlsOpen = false;
  $scope.point = {};
  $scope.autoRotate = false;
  $scope.worldCreated = false;
  $scope.particlesInWorld = 0;

  // world params
  $scope.worldSize = 10000;
  $scope.numPoints = 0;
  $scope.pointSize = 6;
  $scope.targetFrameRate = 60;
  $scope.dataSource = 'http://172.16.2.133:5005/entities/position?southWest=-31,-24&northEast=30,23';

  var streamSampleRate = 1;
  var world = null;
  var vertexIndex = [];

  for (var i = 0; i < 1000000; i++) {
    vertexIndex.push(null);
  }

  var Entity = $resource('http://172.16.2.133:5000/api/v1/entities/:id');

  $scope.onCreateNewClicked = function () {
    es.close();
    world.destroy();
    // world = null;
    $scope.worldCreated = false;
    $scope.point = {};
  };

  $scope.createWorld = function () {

    world = new World('Andy\'s World', {
      numPoints: parseInt($scope.numPoints, 10),
      numReservePoints: parseInt($scope.numPoints, 10) < 100000 ? 100000 : parseInt($scope.numPoints, 10),
      size: parseInt($scope.worldSize, 10),
      pointSize: parseInt($scope.pointSize, 10),
      showStats: true,
      vertexShaderId: 'vertexshader',
      fragmentShaderId: 'fragmentshader',
      containerId: 'WebGLCanvas',
      debug: true,
      onPointSelected: onPointSelected,
      onPointAdded: onPointAdded,
      onPointDeleted: onPointDeleted,
      autoRotate: $scope.autoRotate,
      targetFrameRate: parseInt($scope.targetFrameRate, 10)
    });

    $scope.worldCreated = true;
    initEventSource($scope.dataSource);
  };

  $scope.$watch('numPoints', function (numPoints) {
    // lower target frame rate as user changes numPoints
    if (numPoints) {
      if (parseInt(numPoints, 10) > 1000000) {
        $scope.targetFrameRate = 12;
      } else if (parseInt(numPoints, 10) > 500000) {
        $scope.targetFrameRate = 30;
      }
    }
  });

  /*$scope.$watch('point', function(p) {
    console.log(p);
  }, true);*/

  function onPointSelected(point) {
    $scope.point.id = point.id;
    $scope.point.prefab = point.prefab;
    $scope.point.x = point.x;
    $scope.point.y = point.y;
    $scope.point.z = point.z;

    var entityData = Entity.get({ id: point.id }, function (data) {

      if (entityData) {
        $scope.point.payload = {
          behaviours: entityData.behaviours,
          engineAssignments: entityData.engineAssignments,
          states: entityData.states
        };
        // console.log('Entity data', $scope.point.payload);
      }
    });

    $scope.$apply();
  }

  function onPointDeleted(i) {
    // console.log('onPointDeleted', i);
    $scope.particlesInWorld--;
    $scope.$apply();
  }

  function onPointAdded(i, id) {
    // console.log('onPointAdded', i, id);
    // store vertex position of this entity
    vertexIndex[id] = i;
    $scope.particlesInWorld++;
    $scope.$apply();
  }

  $scope.toggleRotation = function () {
    $scope.autoRotate = !$scope.autoRotate;
    world.setAutoRotate($scope.autoRotate);
  };

  function initEventSource(dataSource) {
    console.log('initEventSource');

    var arr = [];
    var i = 0;
    es = new EventSource(dataSource);
    console.log('event source', es);
    es.onmessage = function (e) {
      i++;

      var data = JSON.parse(e.data);

      for (var j = 0; j < data.length; j++) {

        switch (data[j][0]) {
          case 'put':
            var id = data[j][1];
            var coords = data[j][2];
            var index = vertexIndex[parseInt(id, 10)];

            if (index === null) {
              // console.log('Invalid update request. Entity ' + id + ' has not been added yet:', vertexIndex[id]);
              break;
            }

            // potentially sample the updates if they are very high frequency
            if (i % streamSampleRate === 0) {
              world.updatePoint(index, coords[0], coords[1], coords[2], { id: id });
            }

            // update UI if selected
            if ($scope.point && $scope.point.id === parseInt(id, 10)) {
              $scope.point.x = coords[0];
              $scope.point.y = coords[1];
              $scope.point.z = coords[2];
              // $scope.point.payload = { id: id };

              $scope.$apply();
            }

            break;
          case 'new':
            var id = data[j][1];
            var coords = data[j][2];
            var prefab = data[j][3];

            // todo - check for dupes
            if (vertexIndex[id] !== null) {
              // console.log('Dupe. Entity ' + id + ' already added');
              break;
            }

            world.addPoint(coords[0], coords[1], coords[2], { id: id, prefab: prefab });
            break;
          case 'del':
            var id = data[j][1];
            world.deletePoint(vertexIndex[id]);
            // remove id from vertex index
            vertexIndex[id] = null;
            break;
        }
      }
    };
    es.onopen = function (e) {
      console.log('event source open', e);
    };
    es.onerror = function () {
      console.log('ERROR!');
    };
  }
});
//# sourceMappingURL=main.js.map
