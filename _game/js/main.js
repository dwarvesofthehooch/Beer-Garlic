//import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.js';
//import * as CANNON from 'https://cdnjs.cloudflare.com/ajax/libs/cannon.js/0.6.2/cannon.min.js';

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
}



      $(document).ready(function() { //jak mozesz znajdz ekwiwalent tego zapytania jQuery w pure JS
          menuComponent.startMenu();
          setTimeout(function(){menuComponent.hideIntro();}, 2000);// delirka 2s, zeby było widać logo xD
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


      //start gry
//document.getElementById("startButton").onclick = function() {  
  //  menuComponent.hideMenuElement(menuComponent.menuScreen);
  //  menuComponent.hideMenuElement(menuComponent.menuScreen);
 // }