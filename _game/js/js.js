
/*
function gameInit(axlesHelper) {
  (axlesHelper) ? gameComponent.setAxlesHelper() : null ;
  gameComponent.setAambientLight();
  gameComponent.setDirectionalLight();
  gameComponent.setCameraPosition();
  generarateMap();
  gameComponent.renderer();
  
}*/
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
//==================================================================================================================================================================================
//=======================================================================                                  =========================================================================
//=======================================================================     PODSTAWOWE KOMPONENTY GRY    =========================================================================
//=======================================================================                                  =========================================================================
//==================================================================================================================================================================================


//zmienne parametrów kamery
const width = 5,
  height = width / (window.innerWidth / window.innerHeight);
  var keys = {};
  
//podstawowe komponenty gry  

var gameComponent = {
  scene : new THREE.Scene(),
  axesHelper : new THREE.AxesHelper( 10 ),
  ambientLight : new THREE.AmbientLight(0xffffff, 0,6),
  directionalLight : new THREE.DirectionalLight(0xffffff, 1),
  aspect : window.innerWidth / window.innerHeight,
  
  camera : new THREE.OrthographicCamera(
    width * -2, // left
    width * 2, // right
    height * 2, // top
    height * -2, // bottom
    0, // near plane
    10000 // far plane
  ),
  render : new THREE.WebGLRenderer({antialias : true}),
  
  setAxlesHelper : function() {
    console.log('wywołano axlesHelper');
    this.scene.add( this.axesHelper );
  },
  setAambientLight : function(){
    console.log('wywołano ambientLight');
    this.scene.add(this.ambientLight);
  },
  setDirectionalLight : function(){
    console.log('wywołano directionalLight');
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
  renderer : function(){
    console.log('wywołano renderer');
    this.render.setSize(window.innerWidth, window.innerHeight);
    this.render.render(this.scene, this.camera);
    document.body.appendChild(this.render.domElement);
  },
  rendererUpdate : function(){
    console.log('wywołano renderer update');
    this.render.render(this.scene, this.camera);
  
  }


}
//==================================================================================================================================================================================
//=====================================================================                          ===================================================================================
//=====================================================================     KOMPONENTY GRACZA    ===================================================================================
//=====================================================================                          ===================================================================================
//==================================================================================================================================================================================

function playerComponent(dimensionX, dimensionY, dimensionZ, positionX, positionY, positionZ,  color) {
  
  this.xSpeed = 0.1;
  this.ySpeed = 0.1;
  this.dimensionX = dimensionX,
  this.dimensionY = dimensionY,
  this.dimensionZ = dimensionZ,
  this.color = color;
  this.geometry = new THREE.BoxGeometry(this.dimensionX, this.dimensionY, this.dimensionZ);
  this.material = new THREE.MeshLambertMaterial({color: this.color});
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(positionX, positionY, positionZ);
  
  
  return{
     
  xSpeed : this.xSpeed,
  ySpeed : this.ySpeed,
  //dimensionX : this.dimensionX,
  //dimensionY : this.dimensionY,
  //dimensionZ : this.dimensionZ,
  //color : this.color = color,
  geometry : this.geometry,
  material : this.material,
  mesh : this.mesh,
  positionX : this.positionX = positionX,
  positionY : this.positionY = positionY,
  positionZ : this.positionZ = positionZ,
    playerAddToScene : function(){
      gameComponent.scene.add(this.mesh);
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
        this.mesh.position.x -= (this.xSpeed*2);
        gameComponent.camera.position.x -= (this.xSpeed*2);
      } 
      else if(keys['d'] && keys['s']){
        console.log(2);
        this.mesh.position.y += (this.ySpeed*2);
        gameComponent.camera.position.y += (this.ySpeed*2);
      }
      else if(keys['s'] && keys['a']){
        console.log(3);
        this.mesh.position.x += (this.xSpeed*2);
        gameComponent.camera.position.x += (this.xSpeed*2);
      }else if(keys['a'] && keys['w']){
        console.log(4);
        this.mesh.position.y -= (this.ySpeed*2);
        gameComponent.camera.position.y -= (this.ySpeed*2);
      }
      else if (keys['w']) { //w
        console.log(5);
        this.mesh.translateY( -this.ySpeed);
        this.mesh.translateX( -this.xSpeed);
        gameComponent.camera.position.y -= this.ySpeed;
        gameComponent.camera.position.x -= this.xSpeed;
      }else if(keys['s']){
        console.log(6);
        this.mesh.position.y += this.ySpeed;
        this.mesh.position.x += this.xSpeed;
        gameComponent.camera.position.y += this.ySpeed;
        gameComponent.camera.position.x += this.xSpeed;
      }else if(keys['a']){
        console.log(7);
        this.mesh.position.y -= this.ySpeed;
        this.mesh.position.x += this.xSpeed;
        gameComponent.camera.position.y -= this.ySpeed;
        gameComponent.camera.position.x += this.xSpeed;
      }else if(keys['d']){
        console.log(8);
        this.mesh.position.y += this.ySpeed;
        this.mesh.position.x -= this.xSpeed;
        gameComponent.camera.position.y += this.ySpeed;
        gameComponent.camera.position.x -= this.xSpeed;
      }
    }
  }
}

//==================================================================================================================================================================================
//=====================================================================                          ===================================================================================
//=====================================================================     KOMPONENTY BLOKÓW    ===================================================================================
//=====================================================================                          ===================================================================================
//==================================================================================================================================================================================
const blockParameters = {
  0 : {color : 0x44ff33},
  1 : {color : 0x8888888},
  2 : {color : 0xe3bc68}
}
const mapSize = 50;
var map = [];



console.log("długość listy " + Object.keys(blockParameters).length);


function blockComponent(dimensionX, dimensionY, dimensionZ, positionX, positionY, positionZ,  color) {
  this.dimensionX = dimensionX,
  this.dimensionY = dimensionY,
  this.dimensionZ = dimensionZ,
  this.color = color;
  this.geometry = new THREE.BoxGeometry(this.dimensionX, this.dimensionY, this.dimensionZ);
  this.material = new THREE.MeshLambertMaterial({color: this.color});
  this.mesh = new THREE.Mesh(this.geometry, this.material);
  this.mesh.position.set(positionX, positionY, positionZ);
  
  return{
    positionX : this.positionX = positionX,
    positionY : this.positionY = positionY,
    positionZ : this.positionZ = positionZ,
    mesh : this.mesh,
  blockAddToScene : function(){
    gameComponent.scene.add(this.mesh);
  },
  blockRemoveFromScene : function(){
    gameComponent.scene.remove(this.mesh )
  }
  }
  
}

function generarateMap(){
  console.log('generateMap');
    for (var x = 0; x < mapSize; x++) {
      map[x] = [];
      for (var y = 0; y < mapSize; y++) {
        let rand = Math.floor(Math.random() * (Object.keys(blockParameters).length - 0 )) + 0;
          map[x][y] = new blockComponent(1,1,1,(x-(mapSize/2)),(y-(mapSize/2)),0,blockParameters[rand].color);
          console.log('X: ' + x + " Y: " + y)
      }
  }
}
//==================================================================================================================================================================================
//==============================================================                                             =======================================================================
//==============================================================     GENEROWANIE BLOKÓW W ZASIĘGU KAMERY     =======================================================================
//==============================================================                                             =======================================================================
//==================================================================================================================================================================================
const range = 5;
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
}
function changeCameraView(){
  playerBlockPositionX = parseInt(mapSize/2 + player.mesh.position.x), 
  playerBlockPositionY = parseInt(mapSize/2 + player.mesh.position.y);

  for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
    if(typeof map[x] !== 'undefined'){
      if(map[x][playerBlockPositionY - range-1] !== undefined)
      map[x][playerBlockPositionY - range-1].blockRemoveFromScene();
    if(map[x][playerBlockPositionY + range+1] !== undefined)
      map[x][playerBlockPositionY + range+1].blockRemoveFromScene();
    for (var y = playerBlockPositionY - range; y <playerBlockPositionY+range; y++) {
      if(typeof map[x][y] !== 'undefined'){
        map[x][y].blockAddToScene();
        if(map[playerBlockPositionX - range-1] !== undefined)
          map[playerBlockPositionX - range-1][y].blockRemoveFromScene();
      if(map[playerBlockPositionX + range+1] !== undefined)
      map[playerBlockPositionX + range+1][y].blockRemoveFromScene();
      }
        
    }
    }
  }
}
/*function changeCameraView(){
  var
  playerBlockPositionX = parseInt(mapSize/2 + player.mesh.position.x), 
  playerBlockPositionY = parseInt(mapSize/2 + player.mesh.position.y);
  
  if(keys['w'] && keys['d']){
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX - range][y].blockAddToScene();
          map[playerBlockPositionX + range][y].blockRemoveFromScene();
        }
       }
    }
  } 
  else if(keys['d'] && keys['s']){
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockAddToScene();
      }
    }
  }
  else if(keys['s'] && keys['a']){
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX + range][y].blockAddToScene();
          map[playerBlockPositionX - range][y].blockRemoveFromScene();
        }
       }
    }
  }else if(keys['a'] && keys['w']){
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockAddToScene();
      }
    }
  }
  else if (keys['w']) { //w
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX - range][y].blockAddToScene();
          map[playerBlockPositionX + range][y].blockRemoveFromScene();
        }
       }
    }
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockAddToScene();
      }
    }
    
          
    
    
    
  }else if(keys['s']){
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX + range][y].blockAddToScene();
          map[playerBlockPositionX - range][y].blockRemoveFromScene();
        }
       }
    }
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockAddToScene();
      }
    }
    
  }else if(keys['a']){
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX + range][y].blockAddToScene();
          map[playerBlockPositionX - range][y].blockRemoveFromScene();
        }
       }
    }
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockAddToScene();
      }
    }
  }else if(keys['d']){
    for(var y = playerBlockPositionY -range ; y < playerBlockPositionY+range; y++){
      if(map[playerBlockPositionX - range] !== undefined && map[playerBlockPositionX + range] !== undefined) {
        if(y>=0 && y<mapSize){
          map[playerBlockPositionX - range][y].blockAddToScene();
          map[playerBlockPositionX + range][y].blockRemoveFromScene();
        }
       }
    }
    for(var x = playerBlockPositionX -range ; x < playerBlockPositionX+range; x++){
      if(map[x]!== undefined){
        if(map[x][playerBlockPositionY - range] !== undefined)
          map[x][playerBlockPositionY - range].blockRemoveFromScene();
        if(map[x][playerBlockPositionY + range] !== undefined)
          map[x][playerBlockPositionY + range].blockAddToScene();
      }
    }
  }
}*/
//==================================================================================================================================================================================
//=====================================================================                                 ============================================================================
//=====================================================================     FUNKCJA STARTUJĄCA GRĘ      ============================================================================
//=====================================================================                                 ============================================================================
//==================================================================================================================================================================================

var gameStart = {
  hideMainMenu : function(){
  document.getElementById("startScreen").classList.add("hide");
  document.getElementById("startScreen").classList.remove("show");
  document.getElementById("dataPanel").classList.add("show");
  document.getElementById("dataPanel").classList.remove("hide");
  document.getElementById("startShadow").classList.add("hide");
  document.getElementById("startShadow").classList.remove("show");
  player.playerAddToScene();
  
  }
}

//==================================================================================================================================================================================
//==========================================================================                  ======================================================================================
//==========================================================================     PĘTLA GRY    ======================================================================================
//==========================================================================                  ======================================================================================
//==================================================================================================================================================================================

function gameLoop(){
  requestAnimationFrame(gameLoop);
  player.playerMovement();
  displayCameraPosition();
  displayPlayerPosition();
  changeCameraView();
  displayPlayerOnBlock();
  gameComponent.rendererUpdate();
}

//==================================================================================================================================================================================
//======================================================================                        ====================================================================================
//======================================================================     OBSŁUGA ZDARZEŃ    ====================================================================================
//======================================================================                        ====================================================================================
//==================================================================================================================================================================================

//start gry
document.getElementById("startButton").onclick = function() {  
  gameStart.hideMainMenu();
  gameLoop();
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

//==================================================================================================================================================================================
//======================================================================                         ===================================================================================
//======================================================================     URUCHOMIENIE GRY    ===================================================================================
//======================================================================                         ===================================================================================
//==================================================================================================================================================================================

//gameInit(true);
const player = new playerComponent(1,1,1,0,0,1,0xFF0000);
generarateMap();
gameComponent.setAxlesHelper();
gameComponent.setAambientLight();
gameComponent.setDirectionalLight();
gameComponent.setCameraPosition();
generateCameraInitView();
gameComponent.renderer();