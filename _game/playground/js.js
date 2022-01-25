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
        this.camera.position.set(10,10,10);
        this.camera.up = new THREE.Vector3( 0, 0, 1 );
        this.camera.lookAt(0,0,0);
        this.scene.add(this.camera);
      } ,
        setRenderer : function(){
          this.render.shadowMap.enabled = true;
          this.render.setSize(window.innerWidth, window.innerHeight);
          this.render.render(this.scene, this.camera);
          
          document.body.appendChild(this.render.domElement);
        },
        updateRenderer : function(){
          this.render.setAnimationLoop(gameLoop);
          this.render.render(this.scene, this.camera);
        },
    
    //funkcje cannon.js
        setPhysics(){
            this.world.gravity.set(0, 0, -10); // Gravity pulls things down
            this.world.broadphase = new CANNON.NaiveBroadphase();
            this.world.solver.iterations = 40;
        }
      
      }




      //generowanie bloków


      const blockParameters = {
        0 : {color : 0x44ff33},
        1 : {color : 0x8888888},
        2 : {color : 0xe3bc68}
      }
      const mapSize = 10;
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
    
    //==================================================================================================================================================================================
    //========================================================================                          ================================================================================
    //========================================================================     GENEROWANIE MAPY     ================================================================================
    //========================================================================                          ================================================================================
    //==================================================================================================================================================================================
    
      function generarateMap(){
        for (var x = 0; x < mapSize; x++) {
          map[x] = [];
          for (var y = 0; y < mapSize; y++) {
            let rand = Math.floor(Math.random() * (Object.keys(blockParameters).length - 0 )) + 0;
            map[x][y] = new blockComponent(1,1,1,(x-(mapSize/2)),(y-(mapSize/2)),0,blockParameters[rand].color, 0);
            map[x][y].blockAddToScene();
          }
        }
      }

      generarateMap();
  gameComponent.setAxlesHelper();
  gameComponent.setAambientLight();
  gameComponent.setDirectionalLight();
  gameComponent.setCameraPosition(false);
  gameComponent.setPhysics();
  gameComponent.setRenderer();