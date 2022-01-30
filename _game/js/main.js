//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.js';
//import * as CANNON from 'https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js';

//==================================================================================================================================================================================
//=======================================================================                                  =========================================================================
//=======================================================================     PODSTAWOWE KOMPONENTY GRY    =========================================================================
//=======================================================================                                  =========================================================================
//==================================================================================================================================================================================


//var keys = {}; //keys jest do sterowania, -> przeniesienie do gracza

var gameComponent = {
    // zmienne three.js
    viewRange : new THREE.Group(),
    playerRange : new THREE.Group(),
    scene : new THREE.Scene(),                                      
    axesHelper : new THREE.AxesHelper( 10 ),                        
    ambientLight : new THREE.AmbientLight(0xffffff, 0,5),
    directionalLight : new THREE.DirectionalLight(0xffffff, 0.9),
    loadManager : new THREE.LoadingManager(),  // menager wczytywania tekstur
    textureLoader : new THREE.TextureLoader(), // wczytywacz tekstur
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
            fixedTimeStep : 1.0/60.0, //ilość klatek na sekundę
            maxSubSteps : 7, //subkroki? nie mam pojęcia kompletnie do czego to jest
            lastTime : undefined,
            
    //funkcje three.js
            setAxlesHelper : function() {
              this.scene.add( this.axesHelper );
            },
            setAambientLight : function(){
              this.scene.add(this.ambientLight);
            },
            setDirectionalLight : function(){
              this.directionalLight.position.set(10, 20, 25);
              this.directionalLight.castShadow = true;                          //cień
              this.scene.add(this.directionalLight);
              this.directionalLight.shadow.mapSize.width = 512; // default      //cień
              this.directionalLight.shadow.mapSize.height = 512; // default     //cień
              this.directionalLight.shadow.camera.near = 0.5; // default        //cień
              this.directionalLight.shadow.camera.far = 500; // default         //cień
            },
    
            setCameraPosition : function(){
                this.camera.position.set(10, 10, 10);
                this.camera.up = new THREE.Vector3( 0, 0, 1 );
                this.camera.lookAt(0,0, 0);
                this.scene.add(this.camera);
            } ,
            updateCameraPosition : function(){
                this.camera.position.set(10+player.body.position.x, 10+player.body.position.y, 10+player.body.position.z);
            },
          setRenderer : function(){
            this.scene.add(this.viewRange);
            this.render.shadowMap.enabled = true;                               //cień
            this.render.shadowMap.type = THREE.PCFSoftShadowMap;                //cień
            this.render.setSize(window.innerWidth, window.innerHeight);
            this.render.render(this.scene, this.camera);
              
            document.body.appendChild(this.render.domElement);
          },
          updateRenderer : function(){
            this.render.setAnimationLoop(this.gameLoop);
            
            this.render.render(this.scene, this.camera);
          },
        
        //funkcje cannon.js
            setPhysics(){
                this.world.gravity.set(0, 0, -10); // Gravity pulls things down
                this.world.broadphase = new CANNON.NaiveBroadphase();
                this.world.solver.iterations = 40;
            },
            updatePhysics(time) {
                if (this.lastTime !== undefined) {
                 let dt = (time - this.lastTime) / 1000;
                 this.world.step(this.fixedTimeStep, dt, this.maxSubSteps);
                }
              /*  items.forEach((item) => {
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
                player.mesh.quaternion.copy(player.body.quaternion);*/
                this.lastTime = time;
              },
              gameLoop(time) {
               // player.playerMovement();
              //  displayCameraPosition();
           //     displayPlayerPosition();
            //    resetMaterials();
          //      hoverPieces();
          //      changeCameraView();
        //        updatePhysics(time);
        //        gameComponent.updateCameraPosition()
        
                gameComponent.updateRenderer();
                
              }
          
          }
//==================================================================================================================================================================================
//============================================================================                        ==============================================================================
//============================================================================     KOMPONENTY MENU    =========================================================================
//============================================================================                        ==============================================================================
//==================================================================================================================================================================================


var menuComponent = {
//zmienne
    menuIntro : document.getElementById('menuIntro'),

    menuShadow : document.getElementById('menuShadow'),
    menuWindow : document.getElementById('menuWindow'),

    buttonStart : document.getElementById('buttonStart'),
    buttonOption : document.getElementById('buttonOption'),
    buttonReturn : document.getElementById('buttonReturn'),
    buttonCredits : document.getElementById('buttonCredits'),

    windowOption : document.getElementById('windowOptions'),
    windowCredits : document.getElementById('windowCredits'),

    buttonMenuInGame : document.getElementById('buttonMenuInGame'),
//funkcje
    hideMenuElement : function(element){
        element.classList.add('hide');
        element.classList.remove('show');
        
    },
    showMenuElement : function(element){
        element.classList.add('show');
        element.classList.remove('hide');
        
    },
    hideIntro : function(){
        this.hideMenuElement(this.menuIntro);
    },
    startMenu : function(){
        this.showMenuElement(this.menuShadow);
        this.showMenuElement(this.menuWindow);
        this.showMenuElement(this.buttonStart);
        this.showMenuElement(this.buttonOption);
        this.hideMenuElement(this.buttonReturn);
        this.showMenuElement(this.buttonCredits);
        this.hideMenuElement(this.windowOption);
        this.hideMenuElement(this.windowCredits);
        this.hideMenuElement(this.buttonMenuInGame);
    },
    hideMenu : function(){
        this.hideMenuElement(this.menuShadow);
        this.hideMenuElement(this.menuWindow);
        this.hideMenuElement(this.buttonStart);
        this.hideMenuElement(this.buttonOption);
        this.hideMenuElement(this.buttonReturn);
        this.hideMenuElement(this.buttonCredits);
        this.hideMenuElement(this.windowOption);
        this.hideMenuElement(this.windowCredits);
        this.showMenuElement(this.buttonMenuInGame);
    },
    showMenu : function(){
        this.showMenuElement(this.menuShadow);
        this.showMenuElement(this.menuWindow);
        this.hideMenuElement(this.buttonStart);
        this.showMenuElement(this.buttonOption);
        this.showMenuElement(this.buttonReturn);
        this.showMenuElement(this.buttonCredits);
        this.hideMenuElement(this.windowOption);
        this.hideMenuElement(this.windowCredits);
        this.hideMenuElement(this.buttonMenuInGame);
    },
    showOptionWindow : function(){
        this.showMenuElement(this.windowOption);
    },
    hideOptionWindow: function(){
        this.hideMenuElement(this.windowOption);
    },
    showCreditsWindow : function(){
        this.showMenuElement(this.windowCredits);
    },
    hideCreditsWindow: function(){
        this.hideMenuElement(this.windowCredits);
    },
    generateMenuView : function(){
        blockComponent.loadTextures()
        
        gameComponent.setAxlesHelper();
        gameComponent.setAambientLight();
        gameComponent.setDirectionalLight();
        gameComponent.setCameraPosition(false);
        
        for(let x = -5;x < 5; x++){
          for(let y = -5;y < 5; y++){
            blockComponent.generateBlock(0,x,y,0);
          }
        }
        blockComponent.generateBlock(0,-4,2,1);
        blockComponent.generateBlock(0,-3,2,1);   
        blockComponent.generateBlock(0,-2,2,1);
        blockComponent.generateBlock(0,-1,2,1);
        blockComponent.generateBlock(0,-4,1,1);   
        blockComponent.generateBlock(0,-3,1,1);
        blockComponent.generateBlock(0,-2,1,1);
        blockComponent.generateBlock(0,-3,0,1);
        blockComponent.generateBlock(0,-3,2,2); 
        blockComponent.generateBlock(0,-3,1,2);  
         // };



        gameComponent.setPhysics();
        gameComponent.setRenderer();
    }

}


var blockComponent = {
  blockData : {
/*  ID          NAME          top textures quantity       side textures quantity              COLOR       */
    0 : {   name : 'dirt'  ,        tt : 5,                       st : 2,               color : 0x44ff33},
    1 : {   name : 'stone' ,        tt : 0,                       st : 0,               color : 0x8888888},
    2 : {   name : 'sand'  ,        tt : 0,                       st : 0,               color : 0xe3bc68}
  },
  blockGeometry : new THREE.BoxGeometry(1,1,1),
  sideTextures90 : [],
  sideTextures180 : [],
  topTextures : [],

//funkcje

  loadTextures  : function() {
   for(let b = 0; b < Object.keys(this.blockData).length;b++){
     this.sideTextures90[b] = [];
     this.sideTextures180[b] = [];
     this.topTextures[b] = [];
     for(let t = 0; t < this.blockData[b].st; t++){
        this.sideTextures90[b].push(new THREE.MeshStandardMaterial({map: gameComponent.textureLoader.load('http://localhost:5500/textures/'+b+'_s_'+t+'.png')}),)
        this.sideTextures180[b].push(new THREE.MeshStandardMaterial({map: gameComponent.textureLoader.load('http://localhost:5500/textures/'+b+'_s_'+t+'.png')}),)
      }
      for(let t = 0; t < this.blockData[b].tt; t++){
        this.topTextures[b].push(new THREE.MeshStandardMaterial({map: gameComponent.textureLoader.load('http://localhost:5500/textures/'+b+'_t_'+t+'.png')}),)
     }
    }
  },
  /*randTextures : function(blockID){
    //tutaj jest zrobione idiotycznie, mianowicie tekstury 90 stopni są przarzyste, a 180 nieparzyste. trzeba ogarnąć jak toto obrócić
    //rozwiązania póki co:
    //dubel tablicy z bokami i jedzie
    //najpierw wybieramy id bloku z tablicy, potem id tekstury, wrzucamy teksturę do randText
          let randtext = [];
            randtext[0] = this.sideTextures90[blockID][Math.floor(Math.random()*(this.sideTextures90[blockID].length))];
            randtext[0].map.center.set(.5, .5);
            randtext[0].map.rotation = THREE.MathUtils.degToRad(90);

            randtext[2] = this.sideTextures180[blockID][Math.floor(Math.random()*(this.sideTextures180[blockID].length))];
            randtext[2].map.center.set(.5, .5);
            randtext[2].map.rotation = THREE.MathUtils.degToRad(180);

            randtext[4] = this.topTextures[blockID][Math.floor(Math.random()*(this.topTextures[blockID].length))]
            randtext[4].map.center.set(.5, .5);
            randtext[4].map.rotation = THREE.MathUtils.degToRad(180);
          return randtext;
        },*/
    generateBlock : function(blockID, posX, posY, posZ){
      let rand90, rand180, randtop, textures = [], geometry, mesh;

      rand90 = Math.floor(Math.random()*(blockComponent.sideTextures90[blockID].length));
      rand180 = Math.floor(Math.random()*(this.sideTextures180[blockID].length));
      randtop = Math.floor(Math.random()*(this.topTextures[blockID].length));

      textures[0] = this.sideTextures90[blockID][rand90];
      textures[0].map.center.set(.5, .5);
      textures[0].map.rotation = THREE.MathUtils.degToRad(90);

      textures[2] = this.sideTextures180[blockID][rand180];
      textures[2].map.center.set(.5, .5);
      textures[2].map.rotation = THREE.MathUtils.degToRad(180);

      textures[4] = this.topTextures[blockID][randtop];
      textures[4].map.center.set(.5, .5);
      textures[4].map.rotation = THREE.MathUtils.degToRad(180);

      geometry = new THREE.BoxGeometry(1,1,1);
      mesh = new THREE.Mesh(geometry, textures)
      //mesh.castShadow = true; //default is false      //cień
      //mesh.receiveShadow = true; //default            //cień
      mesh.position.set(posX,posY,posZ);
      gameComponent.scene.add(mesh)

      return blockID + ':' + rand90 + ':' + rand180 + ':' + randtop;
    }
 

}





      //////////////////////////////////////////////////////////////////////////////
      $(document).ready(function() { //jak mozesz znajdz ekwiwalent tego zapytania jQuery w pure JS
          menuComponent.startMenu();
        menuComponent.generateMenuView();
       // gameComponent.setRenderer();
         // gameComponent.viewRange.add(this.mesh)
          setTimeout(function(){menuComponent.hideIntro();},10);// delirka 2s, zeby było widać logo xD
     });

     menuComponent.buttonStart.onclick = function() {
        menuComponent.hideMenu();
     }
     menuComponent.buttonMenuInGame.onclick = function(){
         menuComponent.showMenu();
     }
     menuComponent.buttonReturn.onclick = function(){
         menuComponent.hideMenu();
     }
     menuComponent.buttonOption.onclick = function(){
        menuComponent.showOptionWindow();
    }
    menuComponent.buttonCredits.onclick = function(){
        menuComponent.showCreditsWindow();
    }
    gameComponent.updateRenderer();