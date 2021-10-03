class Overlay extends PIXI.Container{
    constructor(){
        super();
        this.background = new PIXI.Sprite(loadSprite("whitebackground.png"));
        this.background.tint = 0x000000;
        this.animSpeed = .7;
        this.animScale = 4;

        this.final;
    }

    updateDisplay(){
        switch(tileManager.currentTileset){
            case "white":
                this.background.tint = 0x000000;      //black
                break;
            case "red":
                this.background.tint = 0x250000;      //red
                break;
            case "purple":
                this.background.tint = 0x170A34;      //purple
                break;
            case "green":
                this.background.tint = 0x190c05;      //green
                break;
            case "blue":
                this.background.tint = 0x091D28;      //blue
                break;
        }
    }

    transitionTo(){
        if(!this.anim){
            //console.log("no anim");
            return;
        }
        if(!animsEnabled){
            console.log("disabled");
            //this.addChild(this.final);
            this.final.visible = true;
            console.log(this.final.visible);
            return;
        }
        //console.log("normal");
        this.uiAnims.open();
    }

    transitionAway(){
        if(!this.anim){
           // console.log("no anim");
            return;
        }  
        if(!animsEnabled){
            //console.log("disabled");
            this.final.visible = false;
            //this.removeChild(this.final);
            return;
        }
        //console.log("normal");
        this.uiAnims.remove();
        //console.log("removed shitt");   
    }
}

class OptionsOverlay extends Overlay{
    constructor(type = "overlay", currentMode = ""){
        super();
        this.currentMode = currentMode;
        this.type = type;

        this.addChild(this.background);

        this.bg = new PIXI.Sprite(loadSprite("optionstext.png"));
        this.addChild(this.bg);
        
        //Animation stuffs
        this.anim = loadSpriteSheetRows("optionsanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("options.png"));
        //this.addChild(this.final);
        this.final.visible = false;
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //------------------------------------------------------------------------------------------------

        this.music = new Label(loadSprite("musiclabel.png"), 356, 276);
        this.addChild(this.music);
        this.sfx = new Label(loadSprite("sfxlabel.png"), 356, 324);
        this.addChild(this.sfx);
        this.animation = new Label(loadSprite("animlabel.png"), 636, 276);
        this.addChild(this.animation);
        this.vfx = new Label(loadSprite("vfxlabel.png"), 636, 324);
        this.addChild(this.vfx);
        this.maxHealth = new Label(loadSprite("maxhealthlabel.png"), 468, 476);
        this.addChild(this.maxHealth);
        this.maxUpgrades = new Label(loadSprite("maxupgradeslabel.png"), 468, 524);
        this.addChild(this.maxUpgrades);

        this.music.visible = musicEnabled;
        this.sfx.visible = sfxEnabled;
        this.animation.visible = animsEnabled;
        this.vfx.visible = vfxEnabled;
        this.maxHealth.visible = maxHealthCheatEnabled;
        this.maxUpgrades.visible = maxUpgradesCheatEnabled;

        this.musicButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 492, 272, () => {this.musicToggle();});
        this.addChild(this.musicButton);
        this.sfxButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 492, 320, () => {this.sfxToggle();});
        this.addChild(this.sfxButton );
        this.animButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 824, 272, () => {this.animToggle();});
        this.addChild( this.animButton);
        this.vfxButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 824, 320, this.vfxToggle);
        this.addChild(this.vfxButton);
        this.maxHealthButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 676, 472, () => {this.maxHealthToggle();});
        this.addChild(this.maxHealthButton);
        this.maxUpgradesButton = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 676, 520, () => {this.maxUpgradesToggle();});
        this.addChild(this.maxUpgradesButton);

        this.backButton = new Button(loadSpriteSheet("mediumbuttons.png", 6, 168, 92, 3), 512, 632, () => {this.back();});
        this.addChild(this.backButton);

        this.backButton.clickSFX = audioManager.sfx["button"]["mediumBackClick"];

        sceneManager.buttons.push(this.musicButton);
        sceneManager.buttons.push(this.sfxButton);
        sceneManager.buttons.push(this.animButton);
        sceneManager.buttons.push(this.vfxButton);
        sceneManager.buttons.push(this.maxHealthButton);
        sceneManager.buttons.push(this.maxUpgradesButton);
        sceneManager.buttons.push(this.backButton);
    }

    updateDisplay(){
        super.updateDisplay();
        //console.log(gameScene.inGame);
        this.maxHealthButton.invalid = gameScene.inGame;
        this.maxUpgradesButton.invalid = gameScene.inGame;

        this.music.visible = musicEnabled;
        this.sfx.visible = sfxEnabled;
        this.animation.visible = animsEnabled;
        this.vfx.visible = vfxEnabled;
        this.maxHealth.visible = maxHealthCheatEnabled;
        this.maxUpgrades.visible = maxUpgradesCheatEnabled;
    }

    musicToggle(){ audioManager.musicToggle(); musicEnabled = !musicEnabled; this.music.visible = audioManager.musicOn;  }

    sfxToggle(){   audioManager.sfxToggle(); sfxEnabled = !sfxEnabled; this.sfx.visible = audioManager.sfxOn;}

    animToggle(){ animsEnabled = !animsEnabled; console.log(animsEnabled); this.animation.visible = animsEnabled; }

    vfxToggle(){ vfxEnabled = !vfxEnabled; this.parent.vfx.visible = !this.parent.vfx.visible; }

    maxHealthToggle(){ 
        if(this.maxHealthButton.invalid) return;
        if(!gameScene.inGame)
            maxHealthCheatEnabled = !maxHealthCheatEnabled; this.maxHealth.visible = maxHealthCheatEnabled;
    }

    maxUpgradesToggle(){ 
        if(this.maxUpgradesButton.invalid) return;
        if(!gameScene.inGame)
            maxUpgradesCheatEnabled = !maxUpgradesCheatEnabled; this.maxUpgrades.visible = maxUpgradesCheatEnabled; 
    }

    back(){
        console.log("back");
        if(this.type == "overlay"){
            sceneManager.transitionOverlay(sceneManager.previousOverlay, "backward");
        }
        else{
            console.log(sceneManager.previousOverlay);
            sceneManager.transitionScene(sceneManager.previousScene, "backward");
        }
        
    }
}

class ControlsOverlay extends Overlay{
    constructor(texture = loadSprite("controls.png"),  currentMode = ""){
        super();
        this.currentMode = currentMode;
        this.addChild(this.background);

        this.fade = new Fade(texture);
        this.addChild(this.fade);

        this.fade.interactive = true;
        this.fade.on('click', () => {
            this.leaving = true;
            this.increasing = false;
            this.decreasing = true;
            this.fade.interactive = false;
            this.leave();
            audioManager.playSFX(this.sfx);
        });

        this.sfx = audioManager.sfx["button"]["bigClick2"];

        this.increasing = true;
        this.decreasing = false;
        this.finished = false;
        this.staying = false;
        this.leaving = false;
    }

    manage(dt = 1/60){
        this.updateAlpha(1/120);

        if(this.finished){
            console.log(this.finished);
            app.ticker.remove(controlsManage);
        }
        else if(this.leaving){
            console.log("leaving");
            this.back();
            this.leaving = false;
            //audioManager.playSFX(audioManager.sfx["button"]["mediumBackClick"]);
        }
        this.sfx = audioManager.sfx["button"]["mediumBackClick"];
    }

    updateAlpha(dt = 1/60){
        if(this.finished){
            this.back();
            return;
        }
        if(this.increasing)
            this.fade.updateAlpha(dt);
        else if(this.decreasing)
            this.fade.updateAlpha(-dt);           
        
        if(this.fade.alpha > 1){
            this.increasing = false;
            this.fade.alpha = 1;
        }            
        else if(this.fade.alpha < 0){
            this.decreasing = false;
            this.finished = true;
        }
    }

    reset(){
        this.fade.interactive = true;

        this.increasing = true;
        this.decreasing = false;
        this.finished = false;
        this.staying = false;
        this.leaving = false;
        this.fade.alpha = 0;
    }

    leave(){
        this.leaving = true;
        this.decreasing = true;
        this.fade.interactive = false;
    }

    back(){
        sceneManager.transitionScene(sceneManager.previousScene, "backward");
    }
}

class UIOverlay extends Overlay{
    constructor(){
        super();
        this.timerA = new UIText(916, 40, "timernumber", "", this);
        this.timerB = new UIText(1032, 40, "timernumber", "", this); 

        this.blankhearts = new Icon(144, 36, "blankheart", 0, this);
        this.health = new Icon(144, 36, "smallheart", 0, this);

        this.blankbullets = new Icon(144, 72, "blank"+playerManager.bulletType, playerTank.maxShots, this);
        this.bullets = new Icon(144, 72, "filled"+playerManager.bulletType, playerTank.maxShots, this);
        
        this.background = new PIXI.Sprite(loadSprite("uibar.png", 0, 0, 1200, 128));
        this.addChild(this.background);

        this.pauseButton = new Button(loadSpriteSheet("smallbuttons.png", 0, 68, 68, 3), 44, 28, this.pause);
        this.addChild(this.pauseButton);

        //Floor/level stuff
        this.floor = new UIText(640, 36, "tinynumber", (levelManager.currentStage+1).toString(), this);
        this.level = new UIText(640, 68, "tinynumber", (levelManager.currentLevel+1).toString(), this);  
    }

    pause(){
        if(!paused){
            gameScene.currentStatus = "paused";
            paused = true;
            sceneManager.transitionOverlay(sceneManager.pauseOverlay);
        }
    }

    updateDisplay(){
        // this.updateTimer();

        // this.floorOnes.texture = this.floorNum[0];
        // this.levelOnes.texture = this.floorNum[levelManager.totalLevels%10];

        this.blankbullets.updateNumber(playerTank.maxShots);
        this.bullets.updateNumber(playerTank.shotsLeft);

        this.blankhearts.updateNumber(playerTank.maxHealth);
        this.health.updateNumber(playerTank.currentHealth);

        let temp = parseFloat((levelManager.timeElapsed)/1000).toFixed(2);
        while(temp.length < 7)
            temp = 0 + temp;

        this.timerA.updateText(temp.substring(0,4));
        this.timerB.updateText(temp.substring(4,7));

        this.floor.updateText((levelManager.currentStage+1).toString());
        this.level.updateText((levelManager.currentLevel+1).toString());
    } 
}

class PauseOverlay extends Overlay{
    constructor(currentMode = ""){
        super();
        this.currentMode = currentMode;

        this.addChild(this.background);

        this.bg = new PIXI.Sprite(loadSprite("pausetext.png"));
        this.addChild(this.bg);
        
        //Animation stuffs
        this.anim = loadSpriteSheetRows("pauseanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("pausebg.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.quitButton = new Button(loadSpriteSheet("mediumbuttons.png", 1,  212, 92, 3), 340, 544, this.backToMenu);
        this.addChild(this.quitButton);

        this.resumeButton = new Button(loadSpriteSheet("mediumbuttons.png", 3, 212, 92, 3), 644, 544, this.resume);
        this.addChild(this.resumeButton);

        this.optionsButton = new Button(loadSpriteSheet("fancybuttons.png", 2, 156, 68, 3), 1000, 28, () => {sceneManager.transitionOverlay(sceneManager.optionsOverlay)});
        this.addChild(this.optionsButton);

        this.resumeButton.clickSFX = audioManager.sfx["button"]["bigClick2"];
        this.quitButton.clickSFX =  audioManager.sfx["button"]["quitClick"];

        sceneManager.buttons.push(this.quitButton);
        sceneManager.buttons.push(this.resumeButton);
        sceneManager.buttons.push(this.optionsButton);

        //Floor/level stuff
        this.floor = new UIText(552, 252, "mediumnumber", (levelManager.currentStage+1).toString(), this);
        this.level = new UIText(784, 252, "mediumnumber", (levelManager.currentLevel+1).toString(), this);  

        let y = 420;
        //timer used
        this.timerA = new UIText(328, y, "timernumber", "", this);
        this.timerB = new UIText(444, y, "timernumber", "", this); 

        //Points
        this.scorePoints = new UIText(644, y, "timernumber", "000000000", this);


        this.bgm = audioManager.bgm["pause"];
    }

    updateDisplay(){
        super.updateDisplay();

        this.floor.updateText((levelManager.currentStage+1).toString());
        this.level.updateText((levelManager.currentLevel+1).toString());

        let temp = parseFloat((levelManager.timeElapsed)/1000).toFixed(2);
        while(temp.length < 7)
            temp = 0 + temp;

        this.timerA.updateText(temp.substring(0,4));
        this.timerB.updateText(temp.substring(4,7));

        //Points stuff
        temp = playerManager.scorePoints.toFixed(0);
        while(temp.length < 6)
            temp = 0 + temp;

        this.scorePoints.updateText(temp);
    }

    backToMenu(){
        gameScene.removeChild(gameScene.ui);
        cleanLevel();
        sceneManager.transitionOverlay(sceneManager.blankOverlay);
        sceneManager.transitionScene(mainMenuScene, "backward");
    }

    resume(){
        sceneManager.transitionOverlay(sceneManager.blankOverlay, "backward");
        if(paused || gameScene.currentStatus == "paused"){
            gameScene.currentStatus = "play";
        }
        else{
            gameScene.currentStatus = "paused";
            paused = true;
        }        
    }

    updateStats(){}
}

class YouWinOverlay extends Overlay{
    constructor(){
        super();

        this.addChild(this.background);

        this.addChild(new PIXI.Sprite(loadSprite("youwintext.png")));

        //Animation stuffs
        this.anim = loadSpriteSheetRows("youwinanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("youwin.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.quitButton = new Button(loadSpriteSheet("bigbuttons.png", 1, 380, 128, 3), 408, 612, this.quit);
        this.addChild(this.quitButton);

        this.quitButton.clickSFX =  audioManager.sfx["button"]["bigClick2"];

        console.log(sceneManager);
        sceneManager.buttons.push(this.quitButton);

        //timer used
        this.timerA = new UIText(484, 280, "timernumber", "", this);
        this.timerB = new UIText(600, 280, "timernumber", "", this); 

        let y = 484;
        //How many tanks have been destroyed
        this.tanksHit = new UIText(396, y, "timernumber", "", this); 

        //points
        this.scorePoints = new UIText(644, y, "timernumber", "000000000", this);

        this.bgm = audioManager.bgm["clear"];
    }

    updateDisplay(){
        super.updateDisplay();

        //Timer stuff
        let temp = parseFloat((levelManager.totalTimeElapsed)/1000).toFixed(2);
        while(temp.length < 7)
            temp = 0 + temp;

        this.timerA.updateText(temp.substring(0,4));
        this.timerB.updateText(temp.substring(4,7));

        //tanks destroyed stuff
        temp = playerManager.tanksDestroyedTotal + "";
        while(temp.length < 3)
            temp = 0 + temp;

        this.tanksHit.updateText(temp);

        //Points stuff
        temp = playerManager.scorePoints.toFixed(0);
        while(temp.length < 6)
            temp = 0 + temp;

        this.scorePoints.updateText(temp);
        
    }

    quit(){
        gameScene.removeChild(gameScene.ui);
        cleanLevel();
        sceneManager.transitionOverlay(sceneManager.blankOverlay);
        sceneManager.transitionScene(mainMenuScene, "backward");
        
    }
}

class LevelFailOverlay extends Overlay{
    constructor(){
        super();

        this.addChild(this.background);

        this.addChild(new PIXI.Sprite(loadSprite("levelfailtext.png")));

        //Animation stuffs
        this.anim = loadSpriteSheetRows("levelfailanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("levelfail.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.quitButton = new Button(loadSpriteSheet("bigbuttons.png", 1, 380, 128, 3), 408, 592, this.quit);
        this.addChild(this.quitButton);

        this.quitButton.clickSFX =  audioManager.sfx["button"]["quitClick"];
        sceneManager.buttons.push(this.quitButton);


        //Floor/level stuff
        this.floor = new UIText(552, 264, "mediumnumber", (levelManager.currentStage+1).toString(), this);
        this.level = new UIText(784, 264, "mediumnumber", (levelManager.currentLevel+1).toString(), this);  

        let y = 468;
        //How many tanks have been destroyed
        this.tanksHit = new UIText(396, y, "timernumber", "", this); 

        //Points
        this.scorePoints = new UIText(644, y, "timernumber", "000000000", this);

        this.bgm = audioManager.bgm["fail"];
    }

    updateDisplay(){
        super.updateDisplay();

        this.floor.updateText((levelManager.currentStage+1).toString());
        this.level.updateText((levelManager.currentLevel+1).toString());

        //tanks destroyed stuff
        let temp = playerManager.tanksDestroyedTotal + "";
        while(temp.length < 3)
            temp = 0 + temp;

        this.tanksHit.updateText(temp);

        //Points stuff
        temp = playerManager.scorePoints.toFixed(0);
        while(temp.length < 6)
            temp = 0 + temp;

        this.scorePoints.updateText(temp);
    }

    quit(){
        gameScene.removeChild(gameScene.ui);
        cleanLevel();
        sceneManager.transitionOverlay(sceneManager.blankOverlay);
        sceneManager.transitionScene(mainMenuScene, "backward");
        
    }
}

class LevelClearOverlay extends Overlay{
    constructor(){
        super();        

        this.addChild(this.background);

        this.addChild(new PIXI.Sprite(loadSprite("levelcleartext.png")));

        //Animation stuffs
        this.anim = loadSpriteSheetRows("levelclearanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("levelclear.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.nextButton = new Button(loadSpriteSheet("bigbuttons.png", 2, 380, 128, 3), 408, 596, this.next);
        this.addChild(this.nextButton);
        this.nextButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        sceneManager.buttons.push(this.nextButton);

        //floor info
        this.floor = new UIText(552, 264, "mediumnumber", (levelManager.currentStage+1).toString(), this);
        this.level = new UIText(784, 264, "mediumnumber", (levelManager.currentLevel+1).toString(), this);  

        let y = 468;
        //timer used
        this.timerA = new UIText(328, y-20, "timernumber", "", this);
        this.timerB = new UIText(444, y-20, "timernumber", "", this); 

        //points
        this.scorePoints = new UIText(644, y, "timernumber", "000000", this);     

        this.bgm = audioManager.bgm["clear"];
    }

    updateDisplay(){
        super.updateDisplay();

        this.floor.updateText((levelManager.currentStage+1).toString());
        this.level.updateText((levelManager.currentLevel+1).toString());

        //Timer stuff
        let temp = parseFloat((levelManager.totalTimeElapsed)/1000).toFixed(2);
        while(temp.length < 7)
            temp = 0 + temp;

        this.timerA.updateText(temp.substring(0,4));
        this.timerB.updateText(temp.substring(4,7));

        //tanks destroyed stuff
        // temp = playerManager.tanksDestroyed + "";
        // while(temp.length < 3)
        //     temp = 0 + temp;

        // this.tanksHit.updateText(temp);

        //Points stuff
        temp = playerManager.scorePoints.toFixed(0);
        while(temp.length < 6)
            temp = 0 + temp;

        this.scorePoints.updateText(temp);


        //dole out upgrade points
        // if(playerManager.smallUpgradePoints<10)
        //     this.lesserPoints.updateText("0"+playerManager.smallUpgradePoints.toString());
        // else
        //     this.lesserPoints.updateText(playerManager.smallUpgradePoints.toString());

        // if(playerManager.bigUpgradePoints<10)
        //     this.greaterPoints.updateText("0"+playerManager.bigUpgradePoints.toString());
        // else
        //     this.greaterPoints.updateText(playerManager.bigUpgradePoints.toString());
    }

    showSmallUpgrades(){
        sceneManager.transitionOverlay(sceneManager.smallUpgradesOverlay);
    }

    showBigUpgrades(){
        sceneManager.transitionOverlay(sceneManager.bigUpgradesOverlay);
    }

    next(){
        if(levelManager.currentLevel >= 4 && levelManager.currentStage >= 4){
            sceneManager.transitionOverlay(sceneManager.modeClearOverlay);
        }
        else if(playerManager.bigUpgradePoints > 0)
            sceneManager.transitionOverlay(sceneManager.bigUpgradesOverlay);
        else
            sceneManager.transitionOverlay(sceneManager.smallUpgradesOverlay);
    }
}

class SmallUpgradesOverlay extends Overlay{
    constructor(){
        super();        

        this.addChild(this.background);

        this.addChild(new PIXI.Sprite(loadSprite("lesserupgradestext.png")));

        //Animation stuffs
        this.anim = loadSpriteSheetRows("lesserupgradesanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("lesserupgrades.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.backButton = new Button(loadSpriteSheet("mediumbuttons.png", 6, 168, 92, 3), 380, 668, this.back);
        this.addChild(this.backButton);

        this.nextButton = new Button(loadSpriteSheet("mediumbuttons.png", 4, 168, 92, 3), 648, 668, this.nextLevel);
        this.addChild(this.nextButton);

        this.nextButton.clickSFX = audioManager.sfx["button"]["bigClick2"];
        this.backButton.clickSFX =  audioManager.sfx["button"]["mediumBackClick"];

        sceneManager.buttons.push(this.backButton);
        sceneManager.buttons.push(this.nextButton);

        this.lesserPoints = new UIText(756, 228, "mediumnumber", "", this); 

        this.upgrades = [];
        this.currentUpgrades = [];
        //this.setupUpgrades();

        //Upgrade buttons
        //SMALL
        let buttonX = 844;
        let buttonAY = 468;
        let buttonAX = 568;
        this.upgrades["bounce"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAY, this.upgradeBounce);
        this.upgrades["speed"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAX, this.upgradeSpeed);
        this.upgrades["ammo"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAY, this.upgradeAmmo);
        this.upgrades["size"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAX, this.upgradeSize);        
        //HEAL
        this.upgrades["heal"] = new Button(loadSpriteSheet("minibuttons.png", 1, 84, 36, 3), 392, 568, this.heal);
        upgradeManager.small = this.upgrades;

        //Icons that show the health
        let heartX = 224;
        let heartY = 444;
        this.blankhearts = new Icon(heartX, heartY, "blankheart", 0, this);
        this.health = new Icon(heartX, heartY, "smallheart", 0, this);

        //Costs of the two tank upgrades
        let costX = 692;
        let aY = 472;
        let bY = 572;
        this.costA = new Icon(costX, aY, "cost", 1, this);
        this.costB = new Icon(costX, bY, "cost", 1, this);

        this.maxA = new Icon(costX, aY, "maxrank", 0, this);
        this.maxB = new Icon(costX, bY, "maxrank", 0, this);

        this.upgradeACost = new UIText(768, aY, "graynumber", "1", this);
        this.upgradeBCost = new UIText(768, bY, "graynumber", "2", this);
        

        //Text for the upgrade
        let upgradesX = 652;
        let upgradeAY = 436;
        let upgradeBY = 536;
        this.bounce = new UIText(upgradesX, upgradeAY, "small", "bounce", this);
        this.speed = new UIText(upgradesX+24, upgradeBY, "small", "speed", this);
        this.ammo = new UIText(upgradesX, upgradeAY, "small", "rounds", this);
        this.caliber = new UIText(upgradesX+24, upgradeBY, "small", "gauge", this);

        upgradesX = 812;
        upgradeAY = 436;
        upgradeBY = 536;

        let bounceEndX = 1004;

        switch(playerManager.bulletType){
            case "basic":
                this.upgradeALock = new Icon(upgradesX, upgradeAY, "3lock", 1, this);
                this.upgradeBLock = new Icon(upgradesX, upgradeBY, "12lock", 1, this);

                this.upgradeA = new Icon(upgradesX, upgradeAY, "3s", 0, this);
                this.upgradeB = new Icon(upgradesX, upgradeBY, "12s", 0, this);

                this.bounceEnd = new Icon(bounceEndX, upgradeAY, "end", 1, this);
                this.ammo.removeFromScene();
                this.caliber.removeFromScene();

                this.bulletIconLeft = new PIXI.Sprite(loadSprite("pelleticon.png"));
                this.bulletIconLeft.scale.x = -1;
                this.bulletIconLeft.x = 684;
                this.bulletIconLeft.y = 336;                
                this.bulletIconRight = new PIXI.Sprite(loadSprite("pelleticon.png"));
                this.bulletIconRight.x = 984;
                this.bulletIconRight.y = 336;    
                break;
            case "rocket":
                this.upgradeALock = new Icon(upgradesX, upgradeAY, "4lock", 1, this);
                this.upgradeBLock = new Icon(upgradesX, upgradeBY, "24lock", 1, this);

                this.upgradeA = new Icon(upgradesX, upgradeAY, "4s", 0, this);
                this.upgradeB = new Icon(upgradesX, upgradeBY, "24s", 0, this);

                this.bounceEnd = new Icon(bounceEndX, upgradeAY, "end", 1, this);
                this.bounce.removeFromScene();
                this.caliber.removeFromScene();

                this.bulletIconLeft = new PIXI.Sprite(loadSprite("rocketicon.png"));
                this.bulletIconLeft.scale.x = -1;
                this.bulletIconLeft.x = 684;
                this.bulletIconLeft.y = 336;                
                this.bulletIconRight = new PIXI.Sprite(loadSprite("rocketicon.png"));
                this.bulletIconRight.x = 984;
                this.bulletIconRight.y = 336;    
                break;
            case "rubber":
                this.upgradeALock = new Icon(upgradesX, upgradeAY, "5lock", 1, this);
                this.upgradeBLock = new Icon(upgradesX, upgradeBY, "4lock", 1, this);

                this.upgradeA = new Icon(upgradesX, upgradeAY, "5s", 0, this);
                this.upgradeB = new Icon(upgradesX, upgradeBY, "4s", 0, this);

                this.bounceEnd = new Icon(bounceEndX+8, upgradeAY, "end", 1, this);
                this.speed.removeFromScene();
                this.ammo.removeFromScene();

                this.bulletIconLeft = new PIXI.Sprite(loadSprite("rubbericon.png"));
                this.bulletIconLeft.scale.x = -1;
                this.bulletIconLeft.x = 684;
                this.bulletIconLeft.y = 336;                
                this.bulletIconRight = new PIXI.Sprite(loadSprite("rubbericon.png"));
                this.bulletIconRight.x = 984;
                this.bulletIconRight.y = 336;    
                break;
        }    
        
        this.addChild(this.bulletIconLeft);
        this.addChild(this.bulletIconRight);

        this.bgm = audioManager.bgm["clear"];
    }

    updateDisplay(){
        super.updateDisplay();

        if(playerManager.smallUpgradePoints<10)
            this.lesserPoints.updateText("0"+playerManager.smallUpgradePoints.toString());
        else
            this.lesserPoints.updateText(playerManager.smallUpgradePoints.toString());

        this.blankhearts.updateNumber(playerTank.maxHealth);
        this.health.updateNumber(playerTank.currentHealth);

        this.upgradeA.updateNumber(playerManager.upgradeARank);
        this.upgradeB.updateNumber(playerManager.upgradeBRank);


        upgradeManager.small[0].invalid = true;
        upgradeManager.small[1].invalid = true;
        upgradeManager.small[2].invalid = true;
        
        if(!playerManager.upgradeAMax){
            this.upgradeACost.updateText(playerManager.upgradeACost.toString());

            if(playerManager.smallUpgradePoints >= playerManager.upgradeACost)
                upgradeManager.small[0].invalid = false;
        }
        else{
            this.maxA.updateNumber(1);

            this.costA.removeFromScene();
            this.upgradeACost.removeFromScene();
        }

        if(!playerManager.upgradeBMax){
            this.upgradeBCost.updateText(playerManager.upgradeBCost.toString());

            if(playerManager.smallUpgradePoints >= playerManager.upgradeBCost)
                upgradeManager.small[1].invalid = false;
        }
        else{
            this.maxB.updateNumber(1);

            this.costB.removeFromScene();
            this.upgradeBCost.removeFromScene();
        }

        if(playerManager.smallUpgradePoints > 0 && playerTank.currentHealth < playerTank.maxHealth){
            this.upgrades["heal"].invalid = false;
            //upgradeManager
        }
                
    }

    setupUpgrades(){
        for(let s of upgradeManager.small){
            this.addChild(s);
        }
    }

    upgradeBounce(){upgradeManager.smallUpgrade("bounce");}
    upgradeSpeed(){upgradeManager.smallUpgrade("speed");}
    upgradeAmmo(){upgradeManager.smallUpgrade("ammo");}
    upgradeSize(){upgradeManager.smallUpgrade("size");}
    heal(){upgradeManager.smallUpgrade("heal");}

    nextLevel(){
        gameScene.nextLevel();
        sceneManager.transitionOverlay(sceneManager.blankOverlay);
    }

    back(){
        sceneManager.transitionOverlay(sceneManager.previousOverlay);
    }
}

class BigUpgradesOverlay extends Overlay{
    constructor(){
        super();  
        
        this.addChild(this.background);

        this.bg = new PIXI.Sprite(loadSprite("greaterupgradestext.png"));
        this.addChild(this.bg);
        
        //Animation stuffs
        this.anim = loadSpriteSheetRows("greaterupgradesanim.png", 4, 300, 225, 8, 28);
        this.final = new PIXI.Sprite(loadSprite("greaterupgrades.png"));
        this.final.visible = false;
        this.addChild(this.final);
        this.uiAnims = new UIAnim(this.anim, this.final, this, 0,0, this.animSpeed, this.animScale);
        //===============================================================================================

        this.backButton = new Button(loadSpriteSheet("mediumbuttons.png", 6, 168, 92, 3), 380, 668, this.back);
        this.addChild(this.backButton);

        this.nextButton = new Button(loadSpriteSheet("mediumbuttons.png", 4, 168, 92, 3), 648, 668, this.next);
        this.addChild(this.nextButton);

        this.nextButton.clickSFX = audioManager.sfx["button"]["bigClick"];
        this.backButton.clickSFX =  audioManager.sfx["button"]["mediumBackClick"];

        sceneManager.buttons.push(this.backButton);
        sceneManager.buttons.push(this.nextButton);


        this.greaterPoints = new UIText(768, 228, "mediumnumber", "", this); 

        this.upgrades = [];
        this.currentUpgrades = [];
        //this.setupUpgrades();

        //BIG
        let buttonX = 844;
        let buttonAY = 468;
        let buttonAX = 568;
        this.upgrades["fullHeal"] = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 244, 568, this.fullHeal);
        this.upgrades["maxHealth"] = new Button(loadSpriteSheet("minibuttons.png", 0, 52, 36, 3), 432, 568, this.upgradeHealth);
        this.upgrades["movement"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAY, this.upgradeMovement);
        this.upgrades["special"] = new Button(loadSpriteSheet("minibuttons.png", 3, 132, 36, 3), buttonX, buttonAX, this.upgradeSpecial);
        
        upgradeManager.big.push(this.upgrades["fullHeal"]);
        upgradeManager.big.push(this.upgrades["maxHealth"]);
        upgradeManager.big.push(this.upgrades["movement"]);
        upgradeManager.big.push(this.upgrades["special"]);

        //hearts
        let heartX = 224;
        let heartY = 444;
        this.blankhearts = new Icon(heartX, heartY, "blankheart", 0, this);
        this.health = new Icon(heartX, heartY, "smallheart", 0, this);

        let upgradesX = 812;
        let upgradeAY = 436;
        let upgradeBY = 536;
        this.movementLock = new Icon(upgradesX, upgradeAY, "3lock", 1, this);
        this.specialLock = new Icon(upgradesX, upgradeBY, "2lock", 1, this);

        this.movement = new Icon(upgradesX, upgradeAY, "3s", 0, this);
        this.special = new Icon(upgradesX, upgradeBY, "2s", 0, this);

        upgradesX = 652;
        upgradeAY = 436;
        upgradeBY = 536;
        switch(playerManager.bulletType){
            case "basic":
                this.specialText = new UIText(upgradesX, upgradeBY, "small", "reload", this);
                break;
            case "rocket":
                this.specialText = new UIText(upgradesX, upgradeBY, "small", "damage", this);
                break;
            case "rubber":
                this.specialText = new UIText(upgradesX, upgradeBY, "small", "health", this);
                break;
        }   

        this.bgm = audioManager.bgm["clear"];
    }

    updateDisplay(){
        super.updateDisplay();

        
        if(playerManager.bigUpgradePoints<10)
            this.greaterPoints.updateText("0"+playerManager.bigUpgradePoints.toString());
        else
            this.greaterPoints.updateText(playerManager.bigUpgradePoints.toString());

        this.blankhearts.updateNumber(playerTank.maxHealth);
        this.health.updateNumber(playerTank.currentHealth);
        this.movement.updateNumber(playerManager.upgradeMRank);

        this.special.updateNumber(playerManager.upgradeCRank); 

        // upgradeManager.big.push(this.upgrades["fullHeal"]);
        // upgradeManager.big.push(this.upgrades["maxHealth"]);
        // upgradeManager.big.push(this.upgrades["movement"]);
        // upgradeManager.big.push(this.upgrades["special"]);

        upgradeManager.big[0].invalid = true;
        upgradeManager.big[1].invalid = true;
        upgradeManager.big[2].invalid = true;
        upgradeManager.big[3].invalid = true;

        if(playerManager.bigUpgradePoints > 0){
            if(playerTank.maxHealth < 8)
                upgradeManager.big[1].invalid = false;
            if(playerManager.upgradeMRank < 3)
                upgradeManager.big[2].invalid = false;  
            if(playerManager.upgradeCRank < 3)
                upgradeManager.big[3].invalid = false;
            if(playerTank.currentHealth < playerTank.maxHealth)
                upgradeManager.big[0].invalid = false;
        }
    }

    setupUpgrades(){
        //console.log(this.upgrades);
        for(let b of upgradeManager.big){
            //console.log(b);
            this.addChild(b);
        }
        //console.log(upgradeManager.big);
    }

    // upgrade(type){
    //     if(playerManager.bigUpgradePoints > 0){
    //     }
    //     else
    //         upgradeManager.bigUpgrade(type)
    // }

    fullHeal(){upgradeManager.bigUpgrade("fullHeal");}
    upgradeHealth(){upgradeManager.bigUpgrade("health");}
    upgradeMovement(){upgradeManager.bigUpgrade("movement");}
    upgradeSpecial(){upgradeManager.bigUpgrade("special");}

    next(){
        sceneManager.transitionOverlay(sceneManager.smallUpgradesOverlay);
    }

    back(){
        sceneManager.transitionOverlay(sceneManager.levelClearOverlay);
    }
}