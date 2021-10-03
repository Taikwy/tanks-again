class SceneManager{
    constructor(stage){
        this.currentScene;
        this.nextScene;
        this.previousScene;

        this.scenes = [];
        this.overlays = [];
        this.buttons = [];

        this.transitioning = false;

        // this.blankOverlay2 = new Overlay();
        // this.blankOverlay2.visible = true;
        // stage.addChild(this.blankOverlay2);
        // this.overlays.push(this.blankOverlay2);

        this.blankOverlay = new Overlay();
        this.blankOverlay.visible = true;
        stage.addChild(this.blankOverlay);
        this.overlays.push(this.blankOverlay);

        this.currentOverlay = this.blankOverlay;
        this.currentScene = mainMenuScene;

        this.newScene;
        this.previousScene;
        this.newOverlay;
        this.previousOverlay;
        this.transitionFinished = false;

        //controls whether the animations for the UI plays or not
        this.animationsEnabled = true;

        this.transitionSpeed = 1.5;
        this.setupTransitions();
    }

    setupTransitions(){
        this.forwardIn = loadSpriteSheetRows("transitionin.png", 3, 300, 225, 8, 20);
        this.forwardOut = loadSpriteSheetRows("transitionout.png", 3, 300, 225, 8, 20);

        this.backwardIn = loadSpriteSheetRows("transitionin.png", 3, 300, 225, 8, 20);
        this.backwardOut = loadSpriteSheetRows("transitionout.png", 3, 300, 225, 8, 20);
        this.backwardIn = this.backwardIn.reverse();
        this.backwardOut = this.backwardOut.reverse();

        //this.transitionSFX = audioManager.sfx["transition"];
        this.transitionSFX;
        this.inSFX = audioManager.sfx["transitionIn"];
        this.outSFX = audioManager.sfx["transitionOut"];
    }

    setupOverlays(){
        this.optionsOverlay = new OptionsOverlay();
        this.optionsOverlay.visible = false;
        this.overlays.push(this.optionsOverlay);

        this.youWinOverlay = new YouWinOverlay();
        this.youWinOverlay.visible = false;
        this.overlays.push(this.youWinOverlay);
        
        this.levelFailOverlay = new LevelFailOverlay();
        this.levelFailOverlay.visible = false;
        this.overlays.push(this.levelFailOverlay);

        this.levelClearOverlay = new LevelClearOverlay();
        this.levelClearOverlay.visible = false;
        this.overlays.push(this.levelClearOverlay);
        
        this.smallUpgradesOverlay = new SmallUpgradesOverlay();
        this.smallUpgradesOverlay.visible = false;
        this.overlays.push(this.smallUpgradesOverlay);

        this.bigUpgradesOverlay = new BigUpgradesOverlay();
        this.bigUpgradesOverlay.visible = false;
        this.overlays.push(this.bigUpgradesOverlay);

        this.pauseOverlay = new PauseOverlay();
        this.pauseOverlay.visible = false;
        this.overlays.push(this.pauseOverlay);

        upgradeManager.setupUpgrades(playerManager.bulletType);
        this.smallUpgradesOverlay.setupUpgrades();
        this.bigUpgradesOverlay.setupUpgrades();
        this.overlays.push(this.smallUpgradesOverlay);
        this.overlays.push(this.bigUpgradesOverlay);
    }

    updateOverlays(){
        for(let overlay of this.overlays){
            overlay.updateDisplay();
        }
        optionsScene.updateDisplay();
        controlsScene.updateDisplay();

        mainMenuScene.bgm = audioManager.bgm["mainmenu"][tileManager.currentTileset];
        gameScene.bgm = audioManager.gameMusic[tileManager.currentTileset];
    }

    disableButtons(){
        for(let b of this.buttons){
            b.interactive = false;
        }
        this.buttonsEnabled = false;

        this.updateOverlays();
    }

    enableButtons(){
        for(let b of this.buttons){
            b.interactive = true;
        }
        this.buttonsEnabled = true;

        this.updateOverlays();
    }

    startScene(newScene){
        sceneManager.disableButtons();
        sceneManager.updateOverlays();
        
        this.newScene = newScene;
        stage.addChild(this.newScene);

        //If i ever wanna use local memory, i can make the main menu not have a transition the first itme
        // if(!animsEnabled){
        //     console.log("no transition");
        //     this.newScene.transitionTo();
        //     this.previousScene.transitionAway(); 
        //     this.continueScene();
        //     sceneManager.enableButtons();    
        //     return;
        // }
        console.log("no transition");
        this.newScene.transitionTo();
        this.continueScene();
        sceneManager.enableButtons(); 
    }

    transitionScene(newScene, transitionType = "forward"){
        // if(newScene == mainMenuScene){
        //     gameScene.inGame = false;
        // }
        if(this.currentScene == gameScene && newScene == mainMenuScene){
            console.log("going into menu");
            gameScene.inGame = false;
            audioManager.currentSong.stop();
            for(let m of audioManager.gameMusic)
                m.stop();
            audioManager.updateMusic(mainMenuScene.bgm);
        }                

        if(this.currentScene == selectionScene && newScene == gameScene){
            console.log("going into game");
            audioManager.currentSong.stop();
            audioManager.updateMusic(gameScene.bgm);
        }    
        
        sceneManager.disableButtons();
        sceneManager.updateOverlays();
        
        this.previousScene = this.currentScene;
        this.newScene = newScene;
        stage.removeChild(this.currentScene);
        stage.addChild(this.currentScene);
        stage.addChild(this.newScene);

        switch(transitionType){
            case "forward":
                this.transIn = this.forwardIn;
                this.transOut = this.forwardOut;
                this.transitionSFX = this.inSFX;
                break;
            case "backward":
                //console.log("backwards");
                this.transIn = this.backwardOut;
                this.transOut = this.backwardIn;
                this.transitionSFX = this.outSFX;
                break;
        }
        if(!animsEnabled){
            console.log("no transition");
            this.newScene.transitionTo();
            this.previousScene.transitionAway(); 
            this.continueScene();
            sceneManager.enableButtons();    
            return;
        }
        this.transitioning = true;
        let ti = new Transition(this.transIn, this.transOut, 0, 0, this.transitionSpeed, 4, this.currentScene, this.newScene, "scene");
    }

    transitionOverlay(newOverlay, transitionType = "forward"){
        console.log(this.currentOverlay);
        //Doesn't stop the game song
        if(this.currentOverlay == this.blankOverlay){
            playerTank.treadSFX.stop();
            //console.log("stopppingh??");
            for (let et of enemyTanks)
                    et.treadSFX.stop();
            if(newOverlay == this.pauseOverlay){
                console.log("going into pause");
                audioManager.updateMusic(newOverlay.bgm);
            }
            if(newOverlay == this.levelFailOverlay){
                console.log("going into level fail");
                audioManager.updateMusic(newOverlay.bgm);
            }
            if(newOverlay == this.levelClearOverlay || newOverlay == this.youWinOverlay ){
                console.log("going into level clear/win");
                audioManager.updateMusic(newOverlay.bgm);
            }
        }     
        //Going into the game  
        if(newOverlay == this.blankOverlay){
            if(this.currentOverlay == this.pauseOverlay){
                console.log("unpausing into game");
                audioManager.currentSong.stop();
                audioManager.updateMusic(gameScene.bgm);
                this.transitionSFX = this.inSFX;
            }      
            if(this.currentOverlay == this.bigUpgradesOverlay || this.currentOverlay == this.smallUpgradesOverlay){
                console.log("upgrades into game");
                audioManager.currentSong.stop();
                audioManager.updateMusic(gameScene.bgm);
            }     
        }         

        sceneManager.disableButtons();
        sceneManager.updateOverlays();

        this.previousOverlay = this.currentOverlay;
        this.newOverlay = newOverlay;
        stage.removeChild(this.currentOverlay);
        stage.addChild(this.currentOverlay);
        stage.addChild(this.newOverlay);

        switch(transitionType){
            case "forward":
                this.transIn = this.forwardIn;
                this.transOut = this.forwardOut;
                break;
            case "backward":
                this.transIn = this.backwardOut;
                this.transOut = this.backwardIn;
                this.transitionSFX = this.outSFX;
                break;
        }
        if(!animsEnabled){
            console.log("no transition");
            this.newOverlay.transitionTo();
            this.previousOverlay.transitionAway(); 
            this.continueOverlay();
            sceneManager.enableButtons();    
            return;
        }
        this.transitioning = true;
        let ti = new Transition(this.transIn, this.transOut, 0, 0, this.transitionSpeed, 4, this.currentOverlay, this.newOverlay, "overlay");        
    }

    continueScene(){
        
        this.currentScene = this.newScene;
        this.currentScene.visible = true;

        for(let scene of this.scenes){
            if(scene != this.currentScene)
                scene.visible = false;
        }        
        //sceneManager.enableButtons();
    }

    continueOverlay(){
        stage.removeChild(this.currentOverlay);

        this.currentOverlay = this.newOverlay;
        this.currentOverlay.visible = true;

        for(let overlay of this.overlays){
            if(this.currentOverlay != overlay)
                overlay.visible = false;
        }
        //sceneManager.enableButtons();
    }
}

class MainMenuScene extends Overlay{
    constructor(){
        super();
        //Background
        this.mainbg = new PIXI.Sprite(loadSprite("mainmenutext.png"))
        this.addChild(this.mainbg); 

        this.animSpeed = .55;   

        //Animation stuffs
        this.anim = loadSpriteSheetRows("mainmenuanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("mainmenu.png"));
        this.addChild(this.final);
        this.final.visible = false;
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //------------------------------------------------------------------------------------------------

        this.startButton = new Button(loadSpriteSheet("bigbuttons.png", 0, 380, 128, 3), 408, 500, startSelection);
        this.addChild(this.startButton);
        sceneManager.buttons.push(this.startButton);

        this.controlsButton = new Button(loadSpriteSheet("minibuttons.png", 4, 148, 36, 3), 524, 692, startControls);
        this.addChild(this.controlsButton);
        sceneManager.buttons.push(this.controlsButton);

        this.settingsButton = new Button(loadSpriteSheet("minibuttons.png", 5, 132, 36, 3), 532, 772, startOptions);
        this.addChild(this.settingsButton);
        sceneManager.buttons.push(this.settingsButton);

        this.startButton.clickSFX =  audioManager.sfx["button"]["bigClick"];
        
        
        //this.controlsButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        //this.settingsButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        this.bgm = audioManager.bgm["mainmenu"][tileManager.currentTileset];
        //audioManager.updateMusic(this.bgm());
    }
}

class SelectionScene extends Overlay{
    constructor(){
        super();
        this.selectbg = new PIXI.Sprite(loadSprite("selecttext.png"));
        this.addChild(this.selectbg);

        //Animation stuffs
        this.anim = loadSpriteSheetRows("selectanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("select.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //================================================================================================
        
        this.backButton = new Button(loadSpriteSheet("fancybuttons.png", 0, 108, 68, 3), 44, 28, backMainMenu);
        this.addChild(this.backButton);

        // this.backButton2 = new Button(loadSpriteSheet("fancybuttons.png", 3, 108, 68, 3), 44, 118, backMainMenu);
        // this.addChild(this.backButton2);

        this.basicButton = new Button(loadSpriteSheet("selectbutton.png", 0, 732, 200, 3), 236, 216, startBasic);
        this.addChild(this.basicButton);

        this.rocketButton = new Button(loadSpriteSheet("selectbutton.png", 0, 732, 200, 3), 236, 412, startRocket);
        this.addChild(this.rocketButton);

        this.rubberButton = new Button(loadSpriteSheet("selectbutton.png", 0, 732, 200, 3), 236, 608, startRubber);
        this.addChild(this.rubberButton);    

        this.backButton.clickSFX = audioManager.sfx["button"]["mediumBackClick"];
        this.basicButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        this.rocketButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        this.rubberButton.clickSFX = audioManager.sfx["button"]["bigClick"];

        sceneManager.buttons.push(this.backButton);
        sceneManager.buttons.push(this.basicButton);
        sceneManager.buttons.push(this.rocketButton);
        sceneManager.buttons.push(this.rubberButton);
    }
}


class GameScene extends Overlay{
    constructor(){
        super();

        this.currentStatus = "";        
        upgradeManager = new UpgradeManager();

        this.buttons = [];
        this.buttonsEnabled = true;  
        
        this.inGame = false;

        this.bgm = audioManager.gameMusic[tileManager.currentTileset];
    }

    setupOverlay(){
        if(this.ui!= undefined)
            this.removeChild(this.ui);
        this.ui = new UIOverlay();
        this.addChild(this.ui);
    }

    startMode(){
        cleanLevel();

        this.inGame = true;
        this.currentStatus = "play";
        playerTank.isAlive = true;

        //CREATE THE LEVEL
        levelManager.currentStage = 0;
        levelManager.currentLevel = 0;
        levelManager.totalLevels = 1;

        levelManager.createLevel();

        sceneManager.updateOverlays();        
    }

    levelFail(){
        this.currentStatus = "paused";
        paused = true;

        //Add up timer to the total run time
        levelManager.totalTimeElapsed += levelManager.timeElapsed;

        sceneManager.updateOverlays();  

        //this.removeChild(this.ui);
        sceneManager.transitionOverlay(sceneManager.levelFailOverlay);
    }

    levelClear(){
        this.currentStatus = "paused";
        paused = true;

        sceneManager.updateOverlays();  

        //Add up timer to the total run time
        levelManager.totalTimeElapsed += levelManager.timeElapsed;

        
        playerManager.smallUpgradePoints++;

        //debug =========================================================
        //playerManager.smallUpgradePoints+=8;
        //playerManager.bigUpgradePoints+=3;

        //Points logic
        let basePoints = 0;

        let levelClearPoints = (Math.pow(1.1, levelManager.totalLevels - 1) * 100);      //Level clear points
        levelClearPoints += Math.pow(0.98, levelManager.timeElapsed/1000) * (levelClearPoints/2);                  //Time bonus
        basePoints += levelClearPoints;
        basePoints -= playerManager.hitsTaken * 25;

        if(levelManager.currentLevel >= 4){
            playerManager.smallUpgradePoints+=3;
            playerManager.bigUpgradePoints++;

            //Floor clear points
            basePoints += 500;
        }

        playerManager.scorePoints += basePoints;
        console.log(levelManager.currentStage + " " + levelManager.currentLevel);

        //sceneManager.transitionOverlay(sceneManager.youWinOverlay);
        if(levelManager.currentLevel >= 4 && levelManager.currentStage >= 4)
            sceneManager.transitionOverlay(sceneManager.youWinOverlay);
        else
            sceneManager.transitionOverlay(sceneManager.levelClearOverlay);
    }

    nextLevel(){
        //starts from 0
        levelManager.currentLevel++;    
        //starts from 1
        levelManager.totalLevels++;  

        //levelManager.currentLevel+=3;  

        if(levelManager.currentLevel > 4){
            //starts at 0
            levelManager.currentStage++;
            levelManager.currentLevel = levelManager.levels[0];
        }

        //Point bonus logic
        playerManager.hitsTaken = 0;
        playerManager.flawless = true;
        playerManager.accurate = true;
        playerManager.tanksDestroyed = 0;


        this.currentStatus = "play";
        cleanLevel();
        levelManager.createLevel();        
        sceneManager.updateOverlays();
    }
}