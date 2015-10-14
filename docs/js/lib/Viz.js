'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Detector = require('./Detector');

var Viz = (function () {
  function Viz(options) {
    _classCallCheck(this, Viz);

    this.applyPolyfills();

    var detector = new _Detector.Detector();

    // Check for WebGL Support
    if (!detector.webgl) {
      detector.addGetWebGLMessage();
      return;
    }

    this.WORLD_SIZE = options.worldSize;
    this.numFloors = options.numFloors;
    this.floorHeight = this.WORLD_SIZE / this.numFloors;
    this.floorText = [];

    this.NUM_PARTICLES = 1000;
    this.NUM_RESERVE_PARTICLES = 1000;
    this.PARTICLE_SIZE = 1;

    // set the scene size
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;

    // this.WORLD_SIZE = 10000;

    // simulation vars - todo, pass in
    this.cube = null;
    this.elevatorLabel = null;

    // set some camera attributes
    this.VIEW_ANGLE = 60;
    this.NEAR = 1;
    this.FAR = this.WORLD_SIZE * 10;

    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.controls = null;
    this.raycaster = null;
    this.stats = null;

    this.pointCloud = null;
    this.pointCloudGeometry = null;

    // for mouse intersection - interacting with particles
    this.mouse = { x: 0, y: 0 };
    this.intersectedIndex = -1;

    // for custom shaders
    this.attributes = null;
    this.uniforms = null;

    // for adding points without reallocating buffers
    this.reserveParticlesUsed = 0;
    this.newParticlesQueue = [];

    this.updateVertices = false;

    this.init();

    // attach the render-supplied DOM element
    document.getElementById('WebGLCanvas').appendChild(this.renderer.domElement);
    // document.body.appendChild( stats.domElement );
  }

  _createClass(Viz, [{
    key: 'start',
    value: function start() {
      this.animate();
    }
  }, {
    key: 'applyPolyfills',
    value: function applyPolyfills() {
      window.requestAnimFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function ( /* function */callback, /* DOMElement */element) {
          window.setTimeout(callback, 1000 / 60);
        };
      })();
    }
  }, {
    key: 'init',
    value: function init() {

      // create a WebGL renderer, camera, and a scene
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({ clearColor: 0x666666, clearAlpha: 1 });
      this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH / this.HEIGHT, this.NEAR, this.FAR);

      // for collision detection with mouse vector
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      // stats = new Stats();
      // stats.domElement.style.position = 'absolute';
      // stats.domElement.style.top = '0';

      this.attributes = {
        alpha: { type: 'f', value: [] },
        customColor: { type: 'c', value: [] },
        texture1: { type: "t", value: THREE.ImageUtils.loadTexture('textures/sprites/ball.png') }
      };

      this.uniforms = {
        color: { type: 'c', value: new THREE.Color(0xffff00) },
        size: { type: 'f', value: 2 }
      };

      // particle system material
      var newShaderMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        attributes: this.attributes,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent,
        transparent: true,
        vertexColor: true
      });

      // the camera starts at 0,0,0 so pull it back
      this.camera.position.z = this.WORLD_SIZE * 2;

      this.controls = new THREE.OrbitControls(this.camera);
      this.controls.zoomSpeed = 0.5;
      this.controls.maxDistance = this.WORLD_SIZE * 5;
      this.controls.addEventListener('change', this.render.bind(this));

      // start the renderer - set a colour with full opacity
      // renderer.setClearColor(new THREE.Color(0, 1));
      this.renderer.setSize(this.WIDTH, this.HEIGHT);

      this.pointCloudGeometry = new THREE.Geometry();
      this.pointCloudGeometry.dynamic = true;

      /*var pointCloudMaterial = new THREE.PointCloudMaterial({
        color: 0xffffff,
        size: PARTICLE_SIZE,
        fog: true
      });
       var pointCloudMaterial2 = new THREE.PointCloudMaterial({
        color: 0xFFFFFF,
        size: 20,
        map: THREE.ImageUtils.loadTexture(
          'textures/sprites/ball.png'
        ),
        blending: THREE.AdditiveBlending,
        transparent: true
      });*/

      // now create the individual particles
      for (var i = 0; i < this.NUM_PARTICLES; i++) {

        // create a particle with random position values, -250 -> 250
        var pX = Math.random() * this.WORLD_SIZE - this.WORLD_SIZE / 2,
            pY = Math.random() * this.WORLD_SIZE - this.WORLD_SIZE / 2,
            pZ = Math.random() * this.WORLD_SIZE - this.WORLD_SIZE / 2;

        var particle = new THREE.Vector3(pX, pY, pZ);
        particle.name = 'particle-' + i;
        particle.payload = { data: 123, distanceToMove: this.WORLD_SIZE / 2 };

        // add it to the particle system
        this.pointCloudGeometry.vertices.push(particle);
        this.attributes.alpha.value[i] = 1;

        this.attributes.customColor.value[i] = i % 2 === 1 ? new THREE.Color(0x00ffff) : new THREE.Color(0xff69b4);
      }

      // create reserve particles which will become visible
      // when we need some added dynamically
      for (var i = this.NUM_PARTICLES; i < this.NUM_PARTICLES + this.NUM_RESERVE_PARTICLES; i++) {

        var pX = 0,
            pY = 0,
            pZ = 0;

        var particle = new THREE.Vector3(pX, pY, pZ);
        particle.name = 'particle-' + i;
        particle.payload = { data: 0, distanceToMove: 0 };

        // add it to the particle system
        this.pointCloudGeometry.vertices.push(particle);
        this.attributes.alpha.value[i] = 0;

        this.attributes.customColor.value[i] = new THREE.Color(0xffff00);
      }

      // create the particle system
      this.pointCloud = new THREE.PointCloud(this.pointCloudGeometry, this.newShaderMaterial);
      this.pointCloud.sortParticles = true;
      this.pointCloud.dynamic = true;

      this.drawGrid();
      this.drawElevator();
      this.addLights();

      this.scene.add(this.camera);
      // this.scene.add(this.pointCloud);

      // window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
      // window.addEventListener( 'mousemove', onDocumentMouseMove, false );

      // window.addEventListener( 'mousedown', onDocumentMouseDown, false );
    }
  }, {
    key: 'addLights',
    value: function addLights() {
      // var light = new THREE.PointLight(0xffffff);
      // light.position.set(0, 150, 100);
      // this.scene.add(light);

      var light2 = new THREE.AmbientLight(0xffffff);
      this.scene.add(light2);
    }
  }, {
    key: 'updateCubePosition',
    value: function updateCubePosition(i) {
      var r = this.WORLD_SIZE / 2;
      this.cube.position.set(0, -r + i * 10 + this.floorHeight / 8, r);
    }
  }, {
    key: 'onElevatorStateChanged',
    value: function onElevatorStateChanged(data) {
      console.log('viz, onElevatorStateChanged', data);

      var r = this.WORLD_SIZE / 2;
      this.cube.position.set(0, -r + data.floor * this.floorHeight + this.floorHeight / 8, r);
      this.elevatorLabel.position.set(0, -r + data.floor * this.floorHeight + this.floorHeight / 2, r + this.floorHeight / 8 + 50);

      // todo - update label text
      this.elevatorLabel.geometry = new THREE.TextGeometry(data.numPeople, {
        size: 300,
        height: 10,
        curveSegments: 0,
        font: 'helvetiker',
        bevelThickness: 1,
        bevelSize: 2,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1
      });
    }
  }, {
    key: 'drawElevator',
    value: function drawElevator() {
      var r = this.WORLD_SIZE / 2;

      var geometry = new THREE.BoxGeometry(this.floorHeight / 4, this.floorHeight / 4, this.floorHeight / 4);
      var material = new THREE.MeshNormalMaterial({ color: 0x262626 });
      this.cube = new THREE.Mesh(geometry, material);

      this.cube.position.set(0, -r + this.floorHeight / 8, r);
      this.scene.add(this.cube);

      // draw line down to cube
      var material = new THREE.LineBasicMaterial({
        color: 0xcccccc
      });

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(0, -r, r));
      geometry.vertices.push(new THREE.Vector3(0, r, r));
      var line = new THREE.Line(geometry, material);
      this.scene.add(line);

      // label
      var geometry = new THREE.TextGeometry('', {
        size: 300,
        height: 10,
        curveSegments: 0,
        font: 'helvetiker',
        bevelThickness: 1,
        bevelSize: 2,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1
      });
      this.elevatorLabel = new THREE.Mesh(geometry, material);
      this.elevatorLabel.position.set(0, -r, r + this.floorHeight / 8 + 50);
      this.scene.add(this.elevatorLabel);
    }
  }, {
    key: 'updateFloorLabel',
    value: function updateFloorLabel(i, labelText) {
      var textMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff
      });

      // floor labels
      var geometry = new THREE.TextGeometry(labelText, {
        size: 300,
        height: 10,
        curveSegments: 0,
        font: 'helvetiker',
        bevelThickness: 1,
        bevelSize: 2,
        bevelEnabled: true,
        material: 0,
        extrudeMaterial: 1
      });
      this.floorText[i].geometry = geometry;
    }
  }, {
    key: 'onTick',
    value: function onTick(data) {
      // console.log('onTick', data);
      for (var i = 0; i < data.floors.length; i++) {
        this.updateFloorLabel(i, data.floors[i].length);
      }
    }
  }, {
    key: 'drawGrid',
    value: function drawGrid() {
      var r = this.WORLD_SIZE / 2;

      var edgeMaterial1 = new THREE.LineBasicMaterial({
        color: 0x34E97C
      });

      var edgeMaterial2 = new THREE.LineBasicMaterial({
        color: 0x505050
      });
      var material = new THREE.LineBasicMaterial({
        color: 0x262626
      });

      var startVal = -r;

      var numDivisions = 20;
      var divisionLength = this.WORLD_SIZE / numDivisions;

      var floorHeight = this.WORLD_SIZE / this.numFloors;

      for (var j = 0; j < this.numFloors; j++) {

        var textMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff
        });

        // floor labels
        var geometry = new THREE.TextGeometry('', {
          size: 300,
          height: 10,
          curveSegments: 0,
          font: 'helvetiker',
          bevelThickness: 1,
          bevelSize: 2,
          bevelEnabled: true,
          material: 0,
          extrudeMaterial: 1
        });
        var label = new THREE.Mesh(geometry, textMaterial);
        label.position.set(-r + floorHeight * 0.25, -r + j * floorHeight + 0.2 * floorHeight, r * 0.8);
        this.scene.add(label);
        this.floorText.push(label);

        for (var i = 0; i <= numDivisions; i++) {

          var atEdge = i % numDivisions === 0;

          // draw line front-to-back
          var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(startVal + divisionLength * i, -r + j * floorHeight, -r));
          geometry.vertices.push(new THREE.Vector3(startVal + divisionLength * i, -r + j * floorHeight, r));

          // bottom floor, draw whole grid
          if (!j || atEdge) {
            var mat = atEdge ? edgeMaterial2 : material;
            var line = new THREE.Line(geometry, mat);
            this.scene.add(line);
          }

          // draw line across
          var geometry = new THREE.Geometry();
          geometry.vertices.push(new THREE.Vector3(-r, -r + j * floorHeight, startVal + divisionLength * i));
          geometry.vertices.push(new THREE.Vector3(r, -r + j * floorHeight, startVal + divisionLength * i));

          // bottom floor, draw whole grid
          if (!j || atEdge) {
            var mat = i === numDivisions ? edgeMaterial1 : material;
            var line = new THREE.Line(geometry, mat);
            this.scene.add(line);
          }
          // var line = new THREE.Line(geometry, mat);
        }
      }
    }
  }, {
    key: 'setAttributeNeedsUpdateFlags',
    value: function setAttributeNeedsUpdateFlags() {
      this.attributes.ca.needsUpdate = true;
      this.attributes.size.needsUpdate = true;
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

      this.render();
    }
  }, {
    key: 'animate',
    value: function animate() {

      requestAnimationFrame(this.animate.bind(this));
      this.controls.update();

      // stats.update();

      if (this.pointsToMove) {
        this.movePoints();
      }

      this.render();
    }
  }, {
    key: 'onDocumentMouseMove',
    value: function onDocumentMouseMove(event) {

      event.preventDefault();

      this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
      this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      this.raycaster.setFromCamera(this.mouse, this.camera);
      var intersects = this.raycaster.intersectObjects([this.pointCloud], true);
      if (intersects.length) {
        this.highlightParticle(intersects[0]);
      }
    }
  }, {
    key: 'highlightParticle',
    value: function highlightParticle(p) {
      var particle = this.pointCloudGeometry.vertices[p.index];
      this.intersectedIndex = p.index;
      // console.log(intersectedIndex);
      // console.log(particle.name, particle.payload);
    }
  }, {
    key: 'render',
    value: function render() {

      if (this.updateVertices) {
        this.pointCloudGeometry.verticesNeedUpdate = true;
        this.updateVertices = false;
      }

      var startTime = +new Date();
      var timeElapsed = 0;
      var particleToAdd = null;

      var numParticlesAddedThisFrame = 0;

      // if there are new points to add, do what you can in 10ms
      while (timeElapsed < 10 && (particleToAdd = this.newParticlesQueue.shift())) {

        console.log('adding particle', particleToAdd, timeElapsed);

        var i = this.NUM_PARTICLES + reserveParticlesUsed;

        if (i >= this.NUM_PARTICLES + this.NUM_RESERVE_PARTICLES) {
          console.error('No more reserve particles to use.');
          break;
        }

        // add it to the particle system
        this.pointCloudGeometry.vertices[i].set(particleToAdd.x, particleToAdd.y, particleToAdd.z);
        this.reserveParticlesUsed++;

        // show as visible
        this.attributes.alpha.value[i] = 1;

        this.attributes.customColor.needsUpdate = true;
        this.attributes.alpha.needsUpdate = true;
        this.updateVertices = true;

        this.numParticlesAddedThisFrame++;
        timeElapsed += +new Date() - startTime;
        console.log('numParticlesAddedThisFrame', numParticlesAddedThisFrame);
      }

      this.raycaster.setFromCamera(this.mouse, this.camera);

      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: 'movePoints',
    value: function movePoints() {

      var numLeftToMove = 0;

      for (var i = 0; i < this.NUM_PARTICLES; i++) {

        var distanceToMove = this.pointCloudGeometry.vertices[i].payload.distanceToMove;

        var dir = i % 2 === 1 ? 1 : -1;
        var r = Math.round(Math.random() * i * 0.01);

        if (distanceToMove > 0) {
          var pX = this.pointCloudGeometry.vertices[i].x + dir * r,
              pY = this.pointCloudGeometry.vertices[i].y + dir * r,
              pZ = this.pointCloudGeometry.vertices[i].z + dir * r;

          numLeftToMove++;

          this.pointCloudGeometry.vertices[i].payload.distanceToMove -= r;

          // update position of particle
          this.pointCloudGeometry.vertices[i].set(pX, pY, pZ);
        }
      }

      this.pointsToMove = numLeftToMove > 0;

      this.updateVertices = true;
    }
  }, {
    key: 'addPoint',
    value: function addPoint(pX, pY, pZ) {
      // use newParticlesQueue
      this.newParticlesQueue.push({ x: pX, y: pY, z: pZ });
    }
  }, {
    key: 'addTestParticles',
    value: function addTestParticles() {
      for (var i = 0; i < 100; i++) {
        this.newParticlesQueue.push({ x: (Math.cos(i) + 1) * 1000, y: (Math.sin(i) + 1) * 1000, z: 0 });
      }
    }
  }]);

  return Viz;
})();

exports['default'] = { Viz: Viz };
module.exports = exports['default'];