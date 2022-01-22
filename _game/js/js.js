 
let world; // CannonJs world
let lastTime; // Last timestamp of animation

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
          10+(onPlayer) ? player.positionX : 0,          //x
          10+ (onPlayer) ? player.positionY : 0,         //y
          10);                                              //z
      this.camera.up = new THREE.Vector3( 0, 0, 1 );
      this.camera.lookAt(player.positionX-1, player.positionY-1, 0);
      this.scene.add(this.camera);
    } ,
    setRenderer : function(){
      console.log('wywołano renderer');
      this.render.setSize(window.innerWidth, window.innerHeight);
      this.render.render(this.scene, this.camera);
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
    this.body = new CANNON.Body(mass, shape);
    this.body.position.set(positionX, positionY, positionZ);
    return{
      positionX : this.positionX = positionX,
      positionY : this.positionY = positionY,
      positionZ : this.positionZ = positionZ,
      mesh : this.mesh,
      body : this.body,
    blockAddToScene : function(){
      gameComponent.scene.add(this.mesh);
      world.addBody(body);
    },
    blockRemoveFromScene : function(){
      gameComponent.scene.remove(this.mesh )
    }
    }
    
  }
  function generateBox(x, y, z, width, depth, falls) {
    // ThreeJS
    //const geometry = new THREE.BoxGeometry(width, boxHeight, depth);
    //const color = new THREE.Color(`hsl(${30 + stack.length * 4}, 100%, 50%)`);
    //const material = new THREE.MeshLambertMaterial({ color });
    //const mesh = new THREE.Mesh(geometry, material);
    //mesh.position.set(x, y, z);
    //scene.add(mesh);
  
    // CannonJS
    //const shape = new CANNON.Box(
    //  new CANNON.Vec3(width / 2, boxHeight / 2, depth / 2)
    //);
    //let mass = falls ? 5 : 0; // If it shouldn't fall then setting the mass to zero will keep it stationary
    //mass *= width / originalBoxSize; // Reduce mass proportionately by size
    //mass *= depth / originalBoxSize; // Reduce mass proportionately by size
    //const body = new CANNON.Body({ mass, shape });
    //body.position.set(x, y, z);
    //world.addBody(body);
  
    return {
      threejs: mesh,
      cannonjs: body,
      width,
      depth
    };
  }

 // generarateMap();
gameComponent.setAxlesHelper();
gameComponent.setAambientLight();
gameComponent.setDirectionalLight();
gameComponent.setCameraPosition(false);
//generateCameraInitView();
gameComponent.setPhysics()
gameComponent.setRenderer();