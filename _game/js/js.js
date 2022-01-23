var fixedTimeStep = 1.0 / 60.0; // seconds
var maxSubSteps = 3;
var lastTime;
var keys = {};

//==================================================================================================================================================================================
//====================================================================                                         =====================================================================
//====================================================================     FUNKCJE POMOCNICZE/DIAGNOSTYCZNE    =====================================================================
//====================================================================                                         =====================================================================
//==================================================================================================================================================================================

function displayCameraPosition(){
  document.getElementById("cameraPosition").innerHTML = 'Camera position:<br/>X: ' + gameComponent.camera.position.x.toFixed(3) + 
                                                      '<br/>Y: ' + gameComponent.camera.position.y.toFixed(3) +
                                                      '<br/>Z: ' + gameComponent.camera.position.z.toFixed(3);
}
function displayPlayerPosition(){
  document.getElementById("playerPosition").innerHTML = 'Player position:<br/>X: ' + player.mesh.position.x.toFixed(3) + 
                                                      '<br/>Y: ' + player.mesh.position.y.toFixed(3) +
                                                      '<br/>Z: ' + player.mesh.position.z.toFixed(3);
}
function displayPlayerOnBlock(){
  document.getElementById("playerOnBlock").innerHTML = "Player on block:<br/>X: " + Math.round(player.mesh.position.x) + "<br/>Y: "+ Math.round(player.mesh.position.y);
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
   setCameraPosition : function(){
    console.log('wywołano cameraPosition');
    this.camera.position.set(10+player.positionX, 10+player.positionY, 10);
    this.camera.up = new THREE.Vector3( 0, 0, 1 );
    this.camera.lookAt(player.positionX-1, player.positionY-1, 0);
    this.scene.add(this.camera);
    //this.camera.position.x += player.positionX;
    //this.camera.position.y = player.positionY;
    //this.camera.position.z = player.positionZ;
  } ,
    setRenderer : function(){
      this.render.setSize(window.innerWidth, window.innerHeight);
      this.render.render(this.scene, this.camera);
      
      document.body.appendChild(this.render.domElement);
    },
    updateRenderer : function(){
      this.render.setAnimationLoop(animation);
      this.render.render(this.scene, this.camera);
    },

    //funkcje cannon.js
    setPhysics(){
        this.world.gravity.set(0, 0, -10); // Gravity pulls things down
        this.world.broadphase = new CANNON.NaiveBroadphase();
        this.world.solver.iterations = 40;
    }
  
  }

//==================================================================================================================================================================================
//=====================================================================                              ===================================================================================
//=====================================================================     KOMPONENTY PZREDMIOTÓW   ===================================================================================
//=====================================================================                              ===================================================================================
//==================================================================================================================================================================================
const itemParameters = {
  0 : {name : "kufel piwa", dimensionX : 0.4, dimensionY : 0.4, dimensionZ : 0.4, color : 0x0000ff},
  1 : {color : 0x8888888},
  2 : {color : 0xe3bc68}
}
var items = [];
function itemComponent(dimensionX, dimensionY, dimensionZ, positionX, positionY, positionZ,  color, mass) {
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
  itemAddToScene : function(){
    gameComponent.scene.add(this.mesh);
    gameComponent.world.addBody(this.body);
  },
  itemRemoveFromScene : function(){
    gameComponent.scene.remove(this.mesh )
    gameComponent.world.removeBody(this.body);
  }
  }
  
}
for(var i = 0; i < 5; i ++){
  items[i] = new itemComponent(itemParameters[0].dimensionX, itemParameters[0].dimensionY, itemParameters[0].dimensionZ,i,i,1,itemParameters[0].color,0.1 )
 
}
//==================================================================================================================================================================================
//=====================================================================                          ===================================================================================
//=====================================================================     KOMPONENTY GRACZA    ===================================================================================
//=====================================================================                          ===================================================================================
//==================================================================================================================================================================================

function playerComponent(dimensionX, dimensionY, dimensionZ, positionX, positionY, positionZ,  color, mass) {
  
  this.xSpeed = 0.07;
  this.ySpeed = 0.07;
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
     
  xSpeed : this.xSpeed,
  ySpeed : this.ySpeed,
  //dimensionX : this.dimensionX,
  //dimensionY : this.dimensionY,
  //dimensionZ : this.dimensionZ,
  //color : this.color = color,
  geometry : this.geometry,
  material : this.material,
  
  positionX : this.positionX = positionX,
  positionY : this.positionY = positionY,
  positionZ : this.positionZ = positionZ,

  mesh : this.mesh,
  body : this.body,

    playerAddToScene : function(){
      gameComponent.scene.add(this.mesh);
      gameComponent.world.addBody(this.body);
    },
    playerCoordinates : function()
    {
      console.log(this.mesh);
      console.log(this.material);
      console.log(this.geometry);
      console.log(gameComponent.camera.position.x);
      gameComponent.camera.position.x += this.xSpeed;
      console.log(gameComponent.camera.position.x);
    },
    playerMovement : function(){
      console.log(0);
      if(keys['w'] && keys['d']){
        console.log(1);
        this.body.position.x -= (this.xSpeed*2);
        gameComponent.camera.position.x -= (this.xSpeed*2);
      } 
      else if(keys['d'] && keys['s']){
        console.log(2);
        this.body.position.y += (this.ySpeed*2);
        gameComponent.camera.position.y += (this.ySpeed*2);
      }
      else if(keys['s'] && keys['a']){
        console.log(3);
        this.body.position.x += (this.xSpeed*2);
        gameComponent.camera.position.x += (this.xSpeed*2);
      }else if(keys['a'] && keys['w']){
        console.log(4);
        this.body.position.y -= (this.ySpeed*2);
        gameComponent.camera.position.y -= (this.ySpeed*2);
      }
      else if (keys['w']) { //w
        console.log(5);
        this.body.position.y -= this.ySpeed;
        this.body.position.x -= this.xSpeed;
        gameComponent.camera.position.y -= this.ySpeed;
        gameComponent.camera.position.x -= this.xSpeed;
      }else if(keys['s']){
        console.log(6);
        this.body.position.y += this.ySpeed;
        this.body.position.x += this.xSpeed;
        gameComponent.camera.position.y += this.ySpeed;
        gameComponent.camera.position.x += this.xSpeed;
      }else if(keys['a']){
        console.log(7);
        this.body.position.y -= this.ySpeed;
        this.body.position.x += this.xSpeed;
        gameComponent.camera.position.y -= this.ySpeed;
        gameComponent.camera.position.x += this.xSpeed;
      }else if(keys['d']){
        console.log(8);
        this.body.position.y += this.ySpeed;
        this.body.position.x -= this.xSpeed;
        gameComponent.camera.position.y += this.ySpeed;
        gameComponent.camera.position.x -= this.xSpeed;
      }
    }
  }
}



  const blockParameters = {
    0 : {color : 0x44ff33},
    1 : {color : 0x8888888},
    2 : {color : 0xe3bc68}
  }
  const mapSize = 30;
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
      gameComponent.world.removeBody(this.body);
    }
    }
    
  }

  function generarateMap(){
      for (var x = 0; x < mapSize; x++) {
        map[x] = [];
        for (var y = 0; y < mapSize; y++) {
          let rand = Math.floor(Math.random() * (Object.keys(blockParameters).length - 0 )) + 0;
            map[x][y] = new blockComponent(1,1,1,(x-(mapSize/2)),(y-(mapSize/2)),0,blockParameters[rand].color, 0);
           
        }
    }
    
  }



//==================================================================================================================================================================================
//==============================================================                                             =======================================================================
//==============================================================     GENEROWANIE BLOKÓW W ZASIĘGU KAMERY     =======================================================================
//==============================================================                                             =======================================================================
//==================================================================================================================================================================================
const range = 14;
function generateCameraInitView(){
  var
  playerBlockPositionX = parseInt(mapSize/2 + player.mesh.position.x), 
  playerBlockPositionY = parseInt(mapSize/2 + player.mesh.position.y);
 // playerBlockPositionX = Math.round(mapSize/2 + 1), 
//  playerBlockPositionY = Math.round(mapSize/2 + 1);
  for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
    if(typeof map[x] !== 'undefined'){
    for (var y = playerBlockPositionY - range; y <playerBlockPositionY+range; y++) {
      console.log("X: " + x + "y: " + y);
      if(typeof map[x][y] !== 'undefined'){
        map[x][y].blockAddToScene();
      }
        
    }
    }
  }
  // do wywalenia po ogarnięciu dodawania itemów do mapy
  items.forEach((item) => {
    item.itemAddToScene()
  })
}
function changeCameraView(){
  console.log('wywolanochangecamera')
  playerBlockPositionX = parseInt(mapSize/2 + player.mesh.position.x), 
  playerBlockPositionY = parseInt(mapSize/2 + player.mesh.position.y);

  for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
    if(typeof map[x] !== 'undefined'){
      if(map[x][playerBlockPositionY - range-1] !== undefined)
      map[x][playerBlockPositionY - range-1].blockRemoveFromScene();
    if(map[x][playerBlockPositionY + range] !== undefined)
      map[x][playerBlockPositionY + range].blockRemoveFromScene();
    for (var y = playerBlockPositionY - range; y <playerBlockPositionY+range; y++) {
      if(typeof map[x][y] !== 'undefined'){
        map[x][y].blockAddToScene();
        if(map[playerBlockPositionX - range] !== undefined)
          map[playerBlockPositionX - range][y].blockRemoveFromScene();
      if(map[playerBlockPositionX + range] !== undefined)
      map[playerBlockPositionX + range][y].blockRemoveFromScene();
      }
        
    }
    }
  }

  // warunek do poprawy
  //items.forEach((item) => {
  //  if(item.body.position.x > playerBlockPositionX -range && item.body.position.x < playerBlockPositionX + range){
  //      item.itemAddToScene()
   //   }else{
  //      item.itemRemoveFromScene()
   //   }
    
  //})
}

  function animation(time) {
   
    player.playerMovement();
    displayCameraPosition();
  displayPlayerPosition();
  changeCameraView();
  
      updatePhysics(time);
      gameComponent.updateRenderer();
    
  }



  function updatePhysics(time) {
    //gameComponent.world.step(time / 1); // Step the physics world
    if (lastTime !== undefined) {
     var dt = (time - lastTime) / 1000;
     gameComponent.world.step(fixedTimeStep, dt, maxSubSteps);
  }
    items.forEach((item) => {
      item.mesh.position.copy(item.body.position);
      item.mesh.quaternion.copy(item.body.quaternion);
    })
    map.forEach((x) => {
      x.forEach((y) =>{
        y.mesh.position.copy(y.body.position);
        y.mesh.quaternion.copy(y.body.quaternion);
      })
      
    })
    player.mesh.position.copy(player.body.position);
    player.mesh.quaternion.copy(player.body.quaternion);
    // Copy coordinates from Cannon.js to Three.js
   // overhangs.forEach((element) => {
   //   element.threejs.position.copy(element.cannonjs.position);
    //  element.threejs.quaternion.copy(element.cannonjs.quaternion);
  //  });
  lastTime = time;
  }
  

  var gameStart = {
    hideMainMenu : function(){
    gameComponent.updateRenderer();
    document.getElementById("startScreen").classList.add("hide");
    document.getElementById("startScreen").classList.remove("show");
    document.getElementById("dataPanel").classList.add("show");
    document.getElementById("dataPanel").classList.remove("hide");
    document.getElementById("startShadow").classList.add("hide");
    document.getElementById("startShadow").classList.remove("show");
   player.playerAddToScene();
    
    }
  }

  const player = new playerComponent(1,1,1,0,0,10,0xFF0000,60);
generarateMap();
gameComponent.setAxlesHelper();
gameComponent.setAambientLight();
gameComponent.setDirectionalLight();
gameComponent.setCameraPosition(false);
generateCameraInitView();
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

//start gry
document.getElementById("startButton").onclick = function() {  
  gameStart.hideMainMenu();
  //gameLoop();
}

// obsługa sterowania
window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
  if(!keys[e.key]){
    (document.getElementById(e.key+"Key") != null) ? document.getElementById(e.key+"Key").classList.remove("keyClicked") : null ;
  }
});
window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  if(keys[[e.key]]){
    (document.getElementById(e.key+"Key") != null) ? document.getElementById(e.key+"Key").classList.add("keyClicked") : null ;
  }
});
