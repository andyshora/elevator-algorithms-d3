import {Detector} from './Detector';

class Viz {
  constructor(args) {
    this.applyPolyfills();

    let detector = new Detector();

    // Check for WebGL Support
    if (!detector.webgl) {
      detector.addGetWebGLMessage();
      return;
    }



    this.NUM_PARTICLES = 1000;
    this.NUM_RESERVE_PARTICLES = 1000;
    this.PARTICLE_SIZE = 1;

    // set the scene size
    this.WIDTH = window.innerWidth * .68;;
    this.HEIGHT = window.innerHeight;

    this.WORLD_SIZE = 10000;


    // simulation vars - todo, pass in
    this.cube = null;
    this.numFloors = 5;
    this.floorHeight = this.WORLD_SIZE / this.numFloors;

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

  start() {
    this.animate();
  }

  applyPolyfills() {
    window.requestAnimFrame = (function(){
      return window.requestAnimationFrame  ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback, /* DOMElement */ element){
          window.setTimeout(callback, 1000 / 60);
        };
      })();
  }


  init() {

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
      color: { type: 'c', value: new THREE.Color( 0xffff00 ) },
      size: { type: 'f', value: 2 }
    };

    // particle system material
    var newShaderMaterial = new THREE.ShaderMaterial( {
      uniforms:       this.uniforms,
      attributes:     this.attributes,
      vertexShader:   document.getElementById( 'vertexshader' ).textContent,
      fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
      transparent: true,
      vertexColor: true
    });

    // the camera starts at 0,0,0 so pull it back
    this.camera.position.z = this.WORLD_SIZE * 2;

    this.controls = new THREE.OrbitControls( this.camera );
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
      var pX = Math.random() * this.WORLD_SIZE - (this.WORLD_SIZE / 2),
          pY = Math.random() * this.WORLD_SIZE - (this.WORLD_SIZE / 2),
          pZ = Math.random() * this.WORLD_SIZE - (this.WORLD_SIZE / 2);

      var particle = new THREE.Vector3(pX, pY, pZ);
      particle.name = 'particle-' + i;
      particle.payload = { data: 123, distanceToMove: this.WORLD_SIZE / 2 };

      // add it to the particle system
      this.pointCloudGeometry.vertices.push(particle);
      this.attributes.alpha.value[i] = 1;

      this.attributes.customColor.value[i] = (i % 2 === 1) ? new THREE.Color( 0x00ffff ) : new THREE.Color( 0xff69b4 );
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

      this.attributes.customColor.value[i] = new THREE.Color( 0xffff00 );
    }

    // create the particle system
    this.pointCloud = new THREE.PointCloud(this.pointCloudGeometry, this.newShaderMaterial);
    this.pointCloud.sortParticles = true;
    this.pointCloud.dynamic = true;

    this.drawGrid();
    this.drawCube();

    this.scene.add(this.camera);
    // this.scene.add(this.pointCloud);

    // window.addEventListener( 'resize', this.onWindowResize.bind(this), false );
    // window.addEventListener( 'mousemove', onDocumentMouseMove, false );

    // window.addEventListener( 'mousedown', onDocumentMouseDown, false );
  }

  updateCubePosition(i) {
    var r = this.WORLD_SIZE / 2;
    this.cube.position.set(0, -r + (i *10) + (this.floorHeight / 8), r);
  }

  onElevatorStateChanged(data) {
    console.log('viz, onElevatorStateChanged', data);

    var r = this.WORLD_SIZE / 2;
    this.cube.position.set(0, -r + (data.floor * this.floorHeight) + (this.floorHeight / 8), r);
  }

  drawCube() {
    var r = this.WORLD_SIZE / 2;


    var geometry = new THREE.BoxGeometry(this.floorHeight / 4, this.floorHeight / 4, this.floorHeight / 4);
    var material = new THREE.MeshNormalMaterial({ color: 0xff0000 });
    this.cube = new THREE.Mesh(geometry, material);

    this.cube.position.set(0, -r + (this.floorHeight / 8), r);
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


  }

  drawGrid() {
    var r = this.WORLD_SIZE / 2;


    var material = new THREE.LineBasicMaterial({
      color: 0x666666
    });

    var startVal = -r;

    var numDivisions = 20;
    var divisionLength = this.WORLD_SIZE / numDivisions;

    var numFloors = 5;
    var floorHeight = this.WORLD_SIZE / numFloors;

    for (var i = 0; i <= numDivisions; i++) {

      for (var j = 0; j < numFloors; j++) {

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), -r + (j * floorHeight), -r));
        geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), -r + (j * floorHeight), r));
        var line = new THREE.Line(geometry, material);
        this.scene.add(line);

        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vector3(-r, -r + (j * floorHeight), startVal + (divisionLength * i)));
        geometry.vertices.push(new THREE.Vector3(r, -r + (j * floorHeight), startVal + (divisionLength * i)));
        var line = new THREE.Line(geometry, material);
        this.scene.add(line);

      }



      /*var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), r, -r));
      geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), r, r));
      var line = new THREE.Line(geometry, material);
      this.scene.add(line);

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-r, startVal + (divisionLength * i), -r));
      geometry.vertices.push(new THREE.Vector3(-r, startVal + (divisionLength * i), r));
      var line = new THREE.Line(geometry, material);
      this.scene.add(line);

      var geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(r, startVal + (divisionLength * i), -r));
      geometry.vertices.push(new THREE.Vector3(r, startVal + (divisionLength * i), r));
      var line = new THREE.Line(geometry, material);
      this.scene.add(line);*/

      // var geometry = new THREE.Geometry();
      // geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), r, r));
      // geometry.vertices.push(new THREE.Vector3(startVal + (divisionLength * i), r, r));
      // var line = new THREE.Line(geometry, material);
      // this.scene.add(line);
    }
    // geometry.vertices.push(new THREE.Vector3(this.WORLD_SIZE, 0, 0));





  }

  setAttributeNeedsUpdateFlags() {
    this.attributes.ca.needsUpdate = true;
    this.attributes.size.needsUpdate = true;
  }


  onWindowResize() {

    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.render();

  }

  animate() {

    requestAnimationFrame(this.animate.bind(this));
    this.controls.update();

    // stats.update();

    if (this.pointsToMove) {
      this.movePoints();
    }

    this.render();

  }

  onDocumentMouseMove( event ) {

    event.preventDefault();

    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera( this.mouse, this.camera );
    var intersects = this.raycaster.intersectObjects([ this.pointCloud ], true );
    if (intersects.length) {
      this.highlightParticle(intersects[0]);
    }

  }

  highlightParticle(p) {
    var particle = this.pointCloudGeometry.vertices[p.index];
    this.intersectedIndex = p.index;
    // console.log(intersectedIndex);
    // console.log(particle.name, particle.payload);
  }

  render() {

    if (this.updateVertices) {
      this.pointCloudGeometry.verticesNeedUpdate = true;
      this.updateVertices = false;
    }

    var startTime = +new Date();
    var timeElapsed = 0;
    var particleToAdd = null;

    var numParticlesAddedThisFrame = 0;

    // if there are new points to add, do what you can in 10ms
    while ((timeElapsed < 10) && (particleToAdd = this.newParticlesQueue.shift())) {

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

    this.raycaster.setFromCamera( this.mouse, this.camera );

    this.renderer.render( this.scene, this.camera );
  }

  movePoints() {

    var numLeftToMove = 0;

    for (var i = 0; i < this.NUM_PARTICLES; i++) {


      var distanceToMove = this.pointCloudGeometry.vertices[i].payload.distanceToMove;

      var dir = (i % 2 === 1) ? 1 : -1;
      var r = Math.round(Math.random() * i * 0.01);

      if (distanceToMove > 0) {
        var pX = this.pointCloudGeometry.vertices[i].x + (dir * r),
            pY = this.pointCloudGeometry.vertices[i].y + (dir * r),
            pZ = this.pointCloudGeometry.vertices[i].z + (dir * r);

        numLeftToMove++;

        this.pointCloudGeometry.vertices[i].payload.distanceToMove -= r;

        // update position of particle
        this.pointCloudGeometry.vertices[i].set(pX, pY, pZ);
      }

    }

    this.pointsToMove = numLeftToMove > 0;

    this.updateVertices = true;
  }

  addPoint(pX, pY, pZ) {
    // use newParticlesQueue
    this.newParticlesQueue.push({ x: pX, y: pY, z: pZ });
  }


  addTestParticles() {
    for (var i = 0; i < 100; i++) {
      this.newParticlesQueue.push({ x: (Math.cos(i) + 1) * 1000, y: (Math.sin(i) + 1) * 1000, z: 0 });
    }
  }
}

export default { Viz };

