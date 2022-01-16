//=======================================================================================================================================================
//==================================================                                          =========================================================== 
//==================================================      INICJOWANE GRY, wczytywanie gry     ===========================================================
//==================================================                                          ===========================================================
//=======================================================================================================================================================

document.getElementById("startButton").onclick = function() {  
  startGame();
}

function startGame(){
  animate();
  document.getElementById("startScreen").classList.add("hide");
  document.getElementById("startScreen").classList.remove("show");
  document.getElementById("buttonPanel").classList.add("show");
  document.getElementById("buttonPanel").classList.remove("hide");
}
//=======================================================================================================================================================
//===========================================================                      ======================================================================
//===========================================================      STEROWANIE      ======================================================================
//===========================================================                      ======================================================================
//=======================================================================================================================================================


var keys = {};

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


// tworzenie sceny
const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper( 10 );
scene.add( axesHelper );

//=======================================================================================================================================================
//==========================================================                        =====================================================================
//==========================================================      ŚWIATŁO OGÓłEM    =====================================================================
//==========================================================                        =====================================================================
//=======================================================================================================================================================

//swiatlo ogólne
const ambientLight = new THREE.AmbientLight(0xffffff, 0,6);
scene.add(ambientLight);

//swiatło kierunkowe
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(10, 20, 25);
scene.add(directionalLight);

//=======================================================================================================================================================
//==========================================================                        =====================================================================
//==========================================================          KAMERA        =====================================================================
//==========================================================                        =====================================================================
//=======================================================================================================================================================

const aspect = window.innerWidth / window.innerHeight;
const width = 10;
const height = width / aspect;

camera = new THREE.OrthographicCamera(
  width * -2, // left
  width * 2, // right
  height * 2, // top
  height * -2, // bottom
  0, // near plane
  10000 // far plane
);
camera.position.set(10, 10, 10);
camera.up = new THREE.Vector3( 0, 0, 1 );
camera.lookAt(0, 0, 0);
scene.add(camera);
//=======================================================================================================================================================
//==========================================================                        =====================================================================
//==========================================================          SCENA         =====================================================================
//==========================================================                        =====================================================================
//=======================================================================================================================================================

// random do zmiany
const geometry1 = new THREE.BoxGeometry(25,25,1);
const material1 = new THREE.MeshLambertMaterial({color: 0x00FF00});
const mesh1 = new THREE.Mesh(geometry1, material1);
mesh1.position.set(0, -1.1, 0);
scene.add(mesh1);
//=======================================================================================================================================================
//==========================================================                        =====================================================================
//==========================================================      DO OGARNIECIA     =====================================================================
//==========================================================                        =====================================================================
//=======================================================================================================================================================




//kostka animacja
const geometry3 = new THREE.BoxGeometry(1,1,1);
const material3 = new THREE.MeshLambertMaterial({color: 0x0000FF});
const mesh3 = new THREE.Mesh(geometry3, material3);
mesh3.position.set(7 , 10, 5);
scene.add(mesh3);

var xSpeed = 0.1;
var ySpeed = 0.1;



window.addEventListener('keyup', (e) => {

  keys[e.key] = false;
  
});

window.addEventListener('keydown', (e) => {
    
  keys[e.key] = true;
  
 
  
});
// sterowanie myszą
let isDrawing = false;
window.addEventListener('mousedown', e => {
 
  isDrawing = true;
});

window.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    var yMove = (window.innerWidth/2)-e.pageX;
  var xMove = (window.innerHeight/2)-e.pageY;
    
  //playerMesh.position.y += (yMove/10000);
  //  playerMesh.position.x -= (xMove/10000);
  //  camera.position.y += (yMove/10000);
  //  camera.position.x -= (xMove/10000);
  }
  
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
   
  
    isDrawing = false;
  }
});

window.addEventListener('mouseup', function() {
  mouseIsDown = false;
});
//=======================================================================================================================================================
//==========================================================                         ====================================================================
//==========================================================      FUNKCJA GRACZA     ====================================================================
//==========================================================                         ====================================================================
//=======================================================================================================================================================


  const playerGeometry = new THREE.BoxGeometry(1,1,2);
  const playerMaterial = new THREE.MeshLambertMaterial({color: 0xFF0000});
  const playerMesh = new THREE.Mesh(playerGeometry, playerMaterial);
  playerMesh.position.set(1, 1, 1);
  scene.add(playerMesh);


function playerMovement(){
  if(keys['w'] && keys['d']){
    playerMesh.position.x -= (ySpeed*2);
    camera.position.x -= (ySpeed*2);
  } 
  else if(keys['d'] && keys['s']){
    playerMesh.position.y += (ySpeed*2);
    camera.position.y += (ySpeed*2);
  }
  else if(keys['s'] && keys['a']){
    playerMesh.position.x += (ySpeed*2);
    camera.position.x += (ySpeed*2);
  }else if(keys['a'] && keys['w']){
    playerMesh.position.y -= (ySpeed*2);
    camera.position.y -= (ySpeed*2);
  }
  else if (keys['w']) { //w
    playerMesh.translateY( -ySpeed);
    playerMesh.translateX( -xSpeed);
    camera.position.y -= ySpeed;
    camera.position.x -= xSpeed;
  }else if(keys['s']){
    playerMesh.position.y += ySpeed;
    playerMesh.position.x += xSpeed;
    camera.position.y += ySpeed;
    camera.position.x += xSpeed;
  }else if(keys['a']){
    playerMesh.position.y -= ySpeed;
    playerMesh.position.x += xSpeed;
    camera.position.y -= ySpeed;
    camera.position.x += xSpeed;
  }else if(keys['d']){
    playerMesh.position.y += ySpeed;
    playerMesh.position.x -= xSpeed;
    camera.position.y += ySpeed;
    camera.position.x -= xSpeed;
  }
}



//=======================================================================================================================================================
//==========================================================                        =====================================================================
//==========================================================      RENDEROWANIE      =====================================================================
//==========================================================                        =====================================================================
//=======================================================================================================================================================

const render = new THREE.WebGLRenderer({antialias : true});
render.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  requestAnimationFrame(animate);
  render.render(scene, camera);
  mesh3.rotation.y += 0.02;
  playerMovement();

 };
 //animate();
 animate();
//dodawanie do drzewa dom
document.body.appendChild(render.domElement);
