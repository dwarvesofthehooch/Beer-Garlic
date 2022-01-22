var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;
var lastTime;

var player = {
    positionX : 10,
    positionY : 10
}

var gameComponent = {

    // zmienne three.js
    scene : new THREE.Scene(),                                      
    axesHelper : new THREE.AxesHelper( 10 ),                        
    ambientLight : new THREE.AmbientLight(0xffffff, 0,6),
    directionalLight : new THREE.DirectionalLight(0xffffff, 1),
    render : new THREE.WebGLRenderer({antialias : true}),
    camera : new THREE.OrthographicCamera(
      5 * -2, // left
      5 * 2, // right
      5 / (window.innerWidth / window.innerHeight) * 2, // top
      5 / (window.innerWidth / window.innerHeight) * -2, // bottom
      1, // near plane
      10000 // far plane
    ),

//zmienne cannon.js
    world : new CANNON.World(),
    
//funkcje three.js
    setAxlesHelper : function() {
      this.scene.add( this.axesHelper );
    },
    setAambientLight : function(){
      this.scene.add(this.ambientLight);
    },
    setDirectionalLight : function(){
      this.directionalLight.position.set(10, 20, 25);
      this.scene.add(this.directionalLight);
    },
    setCameraPosition : function(onPlayer){
      this.camera.position.set(
          10,//+(onPlayer) ? player.positionX : 0,          //x
          10,//+ (onPlayer) ? player.positionY : 0,         //y
          10);                                              //z
      this.camera.up = new THREE.Vector3( 0, 0, 1 );
      this.camera.lookAt(0,0,0);
      //this.camera.lookAt(player.positionX-1, player.positionY-1, 0);
      this.scene.add(this.camera);
    } ,
    setRenderer : function(){
      this.render.setSize(window.innerWidth, window.innerHeight);
      this.render.render(this.scene, this.camera);
      this.render.setAnimationLoop(animation);
      document.body.appendChild(this.render.domElement);
    },
    updateRenderer : function(){
      this.render.render(this.scene, this.camera);
    },

    //funkcje cannon.js
    setPhysics(){
        this.world.gravity.set(0, 0, -10); // Gravity pulls things down
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 40;
    }
  
  }

  var map = [];

  function blockComponent(dimensionX, dimensionY, dimensionZ, positionX, positionY, positionZ,  color, mass) {
    //parameters
    this.dimensionX = dimensionX,
    this.dimensionY = dimensionY,
    this.dimensionZ = dimensionZ,
    this.color = color;

    //three js object config
    this.geometry = new THREE.BoxGeometry(this.dimensionX, this.dimensionY, this.dimensionZ);
    this.material = new THREE.MeshLambertMaterial({color: this.color});
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(positionX, positionY, positionZ);
    //cannon js object config

    this.shape = new CANNON.Box(new CANNON.Vec3(this.dimensionX / 2, this.dimensionY / 2, this.dimensionZ /2));
    this.body = new CANNON.Body({mass, shape : this.shape});
    this.body.position.set(positionX, positionY, positionZ);
    return{
      positionX : this.positionX = positionX,
      positionY : this.positionY = positionY,
      positionZ : this.positionZ = positionZ,
      mesh : this.mesh,
      body : this.body,
    blockAddToScene : function(){
      gameComponent.scene.add(this.mesh);
      gameComponent.world.addBody(this.body);
    },
    blockRemoveFromScene : function(){
      gameComponent.scene.remove(this.mesh )
    }
    }
    
  }

  map[0] = new blockComponent(10,10,1,0,0,0,0x00ff00,0);
  map[1] = new blockComponent(0.5,0.5,1,0.5,0.5,2,0x0000ff,1);
  map[2] = new blockComponent(1,1,1,0,0,5,0xff0000,2);

  map[0].blockAddToScene();
  map[1].blockAddToScene();
  map[2].blockAddToScene();
  function animation(time) {
   
  
      updatePhysics(time);
      gameComponent.updateRenderer();
    
  }



  function updatePhysics(time) {
    //gameComponent.world.step(time / 1); // Step the physics world
    if (lastTime !== undefined) {
     var dt = (time - lastTime) / 1000;
     gameComponent.world.step(fixedTimeStep, dt, maxSubSteps);
  }
    map.forEach((element) => {
      element.mesh.position.copy(element.body.position);
      element.mesh.quaternion.copy(element.body.quaternion);
    })
    // Copy coordinates from Cannon.js to Three.js
   // overhangs.forEach((element) => {
   //   element.threejs.position.copy(element.cannonjs.position);
    //  element.threejs.quaternion.copy(element.cannonjs.quaternion);
  //  });
  lastTime = time;
  }
  

  var gameStart = {
    hideMainMenu : function(){
    document.getElementById("startScreen").classList.add("hide");
    document.getElementById("startScreen").classList.remove("show");
    document.getElementById("dataPanel").classList.add("show");
    document.getElementById("dataPanel").classList.remove("hide");
    document.getElementById("startShadow").classList.add("hide");
    document.getElementById("startShadow").classList.remove("show");
   // player.playerAddToScene();
    
    }
  }


gameStart.hideMainMenu();
 // generarateMap();
gameComponent.setAxlesHelper();
gameComponent.setAambientLight();
gameComponent.setDirectionalLight();
gameComponent.setCameraPosition(false);
//generateCameraInitView();
gameComponent.setPhysics();
gameComponent.setRenderer();


/*
// Setup our world
var world = new CANNON.World();
world.gravity.set(0, 0, -9.82); // m/s²

// Create a sphere
var radius = 1; // m
var sphereBody = new CANNON.Body({
   mass: 5, // kg
   position: new CANNON.Vec3(0, 0, 10), // m
   shape: new CANNON.Sphere(radius)
});
world.addBody(sphereBody);

// Create a plane
var groundBody = new CANNON.Body({
    mass: 0 // mass == 0 makes the body static
});
var groundShape = new CANNON.Plane();
groundBody.addShape(groundShape);
world.addBody(groundBody);

var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;

// Start the simulation loop
var lastTime;
(function simloop(time){
  requestAnimationFrame(simloop);
  if (lastTime !== undefined) {
     var dt = (time - lastTime) / 1000;
     world.step(fixedTimeStep, dt, maxSubSteps);
  }
  console.log("Sphere z position: " + sphereBody.position.z);
  lastTime = time;
})();*/