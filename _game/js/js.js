//funkcja startowa

function gameInit(axlesHelper) {
  (axlesHelper) ? gameComponent.setAxlesHelper() : null ;
  gameComponent.setAambientLight();
  gameComponent.setDirectionalLight();
  gameComponent.setCameraPosition();
  gameComponent.renderer();
}
//zmienne
const width = 10,
  height = width / (window.innerWidth / window.innerHeight);
  var keys = {};
  
  

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
    this.camera.position.set(10, 10, 10);
    this.camera.up = new THREE.Vector3( 0, 0, 1 );
    this.camera.lookAt(0, 0, 0);
    this.scene.add(this.camera);
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
const player = new playerComponent(1,1,2,1,1,1,0xFF0000);

var gameStart = {
  hideMainMenu : function(){
  document.getElementById("startScreen").classList.add("hide");
  document.getElementById("startScreen").classList.remove("show");
  document.getElementById("buttonPanel").classList.add("show");
  document.getElementById("buttonPanel").classList.remove("hide");
  }
}

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
  this.mesh.position.x = positionX,
  this.mesh.position.y = positionY,
  this.mesh.position.z = positionZ,
  console.log(".................. "  + this.mesh.position.x);
  gameComponent.scene.add(this.mesh);
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

//const player = new playerComponent(1,1,2,1,1,1,0xFF0000);
//wywołanie funkcji
gameInit(true);

//event listners
document.getElementById("startButton").onclick = function() {  
  gameStart.hideMainMenu();
  
  gameLoop();
}

function gameLoop(){
  requestAnimationFrame(gameLoop);
  
 player.playerMovement();
 //player.playerCoordinates();

 gameComponent.rendererUpdate();
}



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