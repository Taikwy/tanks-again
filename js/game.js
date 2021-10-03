// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application({
    width: 1200,
    height: 900
});

document.body.appendChild(app.view);
let gameScreen = document.querySelector("#gameScreen");
gameScreen.appendChild(app.view);

//app.renderer.backgroundColor = 0x091D28;      //blue
//app.renderer.backgroundColor = 0x281608;      //green
//app.renderer.backgroundColor = 0x250000;      //red
//app.renderer.backgroundColor = 0x170A34;      //purple
app.renderer.backgroundColor = 0x000000;      //black

//PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
//PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;

//PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.LINEAR;
//console.log(PIXI.SCALE_MODES.DEFAULT);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;


let loadedPercent = 0;
let progress;
app.ticker.add(progressLoop);

function progressLoop(){
    if(!progress){
        console.log("making the bar");
        progress = new Progress();
        app.stage.addChild(progress);
        console.log(progress);
    }
    else
        progress.updateBar(app.loader.progress/100);
}


// pre-load the images
app.loader.baseUrl = "assets/images/fonts";
app.loader.
    add([
        //"fonts.png",
        "smallfont.png",
        "largefont.png",
        "buttonfont.png",
        "mediumfont.png",

        "timernumbers.png",
        //"floornumbers.png",
        "scorenumbers.png",
        "tinynumbers.png",
        
        "numbers.png",
        //"bignumbers.png",
        //"mediumnumbers.png",
        "smallnumbers.png",
        "graynumber.png",
        "statsnumber.png",

        "mediumnumber.png",
        "timernumber.png",
        "smallnum.png"
    ]);
app.loader.baseUrl = "assets/images/tanks";
app.loader.
    add([
        "pbasic.png",
        "psmall.png",
        "procket.png",
        "turrets.png",
        "treads.png",
        "bodies.png",
        "bulletexplosion.png",
        "tankexplosion.png",
        "basicBullet.png",
        "smallBullet.png",
        "rocket.png",
        "trail.png",

        //"ptrail.png",
        //"procketexplosions.png",
        //"prubberexplosions.png",
        //"etrail.png",
        "eexplosions.png",
        "erubberexplosions.png",

        "bluetrail.png",
        "bluetrail-long.png",
        "redtrail.png",
        "blacktrail.png",

        "bluelargetrail.png",
        "blacklargetrail.png",
        "teallargetrail.png",
        "redlargetrail.png",
        "orangelargetrail.png",

        "greenrubber.png",
        "darkgreenrubber.png",
        "bluerubber.png",
        "yellowrubber.png",
        "orangerubber.png",
        "redrubber.png",
        "blueexplosions.png",

        "playerrocket.png",
        "tealrocket.png",
        "redrocket.png",
        "rocketexplosion.png"
    ]);
app.loader.baseUrl = "assets/images/tiles";
app.loader.
    add([
        //"tileset1.png",
        "tileset2.png",
        "tileset3.png",
        "tileset4.png",
        "tileset5.png",
        "tileset6.png"
    ]);
app.loader.baseUrl = "assets/images/bgs";
app.loader.
    add([
        "lesserbg.png",
        "greaterbg.png",
        "alpha background.png",
        "whitebackground.png",
        "levelstart.png",

        "transitions.png",
        "transitionin.png",
        "transitionout.png",
        "transitioninb.png",
        "transitionoutb.png",
        "backgrounds.png",
        "select.png",
        "pause.png",


        "lesserupgrades.png",
        "lesserupgradestext.png",
        "lesserupgradesanim.png",
        
        "greaterupgrades.png",
        "greaterupgradesanim.png",
        "greaterupgradesgray.png",
        "greaterupgradestext.png",

        "pausebg.png",
        "pauseanim.png",
        "pausetext.png",

        "levelclearanim.png",
        "levelclear.png",
        "levelcleartext.png",

        "levelfailanim.png",
        "levelfail.png",
        "levelfailtext.png",

        "youwinanim.png",
        "youwin.png",
        "youwintext.png",

        "selectanim.png",
        "selecttext.png",

        // "settings.png",
        // "settingsanim.png",
        // "settingstext.png",

        "options.png",
        "optionsanim.png",
        "optionstext.png",

        "mainmenu.png",
        "mainmenuanim.png",
        "mainmenutext.png",

        "controls.png",
        "tempcontrols.png"
    ]);
app.loader.baseUrl = "assets/images/ui";
app.loader.
    add([       
        "startbuttons.png",
                
        "playbuttons.png",
        "ui.png",
        "24s.png",
        "12s.png",
        "5s.png",
        "4s.png",
        "3s.png",
        "2s.png",
        "24lock.png",
        "12lock.png",
        "5lock.png",
        "4lock.png",
        "3lock.png",
        "2lock.png",
        "mediumheart.png",
        "smallheart.png",
        
        "resumebutton.png",
        
        "quitbutton.png",
        "blankbasic.png",
        "filledbasic.png",
        "blankrocket.png",
        "filledrocket.png",
        "blankrubber.png",
        "filledrubber.png",
        "smallbuttons.png",
        "locked.png",
        "upgradeEnd.png",
        "selectbutton.png",
        
        
        "minibuttons.png",
        "cost.png",
        "maxrank.png",
        "mediumbuttons.png",
        
        "uibar.png",
        "blankheart.png",

        "bigbuttons.png",

        "rubbericon.png",
        "pelleticon.png",
        "rocketicon.png",

        "musiclabel.png",
        "sfxlabel.png",
        "animlabel.png",
        "vfxlabel.png",
        "maxhealthlabel.png",
        "maxupgradeslabel.png",

        "fancybuttons.png"
    ]);
app.loader.baseUrl = "assets/images";
app.loader.
    add([
        // "enemyBullet.png",
        // "tanks.png",
        // "treadTrack.png",

        "newin.png",
        "newout.png"

        // "progressframe.png",
        // "progressbar.png"
        
    ]);

app.loader.baseUrl = "sounds";
app.loader.
    add([]);

app.loader.onProgress.add(e => {
     //console.log(`progress=${e.progress}`)
});
app.loader.onComplete.add(setup);
app.loader.load();



// aliases
let stage;

//texture shortcut
let TextureCache = PIXI.utils.TextureCache

//Scene and label variables
let tempControls;
let mainMenuScene;
let selectionScene;
let optionsScene;
let controlsScene;
let controlsOverlay;
let startScene, titleScreen;
let gameScene;

let uiOverlay;

//Setting variables
let musicEnabled = true;
let sfxEnabled = true;
let animsEnabled = true;
let vfxEnabled = true;
let maxHealthCheatEnabled = false;
let maxUpgradesCheatEnabled = false;

//music and sound variables
let music, playerShot, enemyShot, bulletExpl, tankExpl;

//Mouse position shortcut
let mousePosition;

let takingInput = false;

let spamkey = true;

let levelManager;

let sceneManager;

let fontManager;

let iconLoader;

let audioManager;


//select screen
let bulletType = "";
let selectBack;


//Level geometry and layout variables
let tileManager;
let themes = [];
let walls = [];
let tiles = [];
let tileSize = 160;
let levelX = 12*80
let levelY = 10*80;

//Player variables
let playerTankSheet = {};
let playerTank;
let playerBullets = [];
let playerManager;
let upgradeManager;

//Enemy variables
let enemyManager;
let enemyTanksheet = {};
let enemyTanks = [];
let enemyBullets = [];
let bullets = [];

//Spritesheets
let bulletExplosions = [];
let bulletExplosionTextures;

let tankExplosions = [];
let tankExplosionTextures;

//Basic game variables
let score = 0;
let paused = true;

let timeElapsed = 0;

let hitstop = 0;

let screenTransition;

function setup() {
    //console.log(progress);
    app.ticker.remove(progressLoop);
    //console.log(progress);
    progress.destroy();
    //console.log(progress);
    stage = app.stage;
    
    audioManager = new AudioManager();

    fontManager = new FontLoader();
    iconLoader = new IconLoader();
    levelManager = new LevelManager(64, 18, 12, 24, 120);    
    tileManager = new TileManager(64, 18, 12, 24, 120);
    enemyManager = new EnemyManager(18, 12, 24, 120);
    playerManager = new PlayerManager(18, 12, 24, 120);  
    sceneManager = new SceneManager(stage);
    setupScenes(stage);

    app.ticker.add(controlsFade);
}

let fade;
function controlsFade(){
    if(!tempControls){
        tempControls = new ControlsOverlay(loadSprite("tempcontrols.png"));
        tempControls.visible = true;
        sceneManager.currentScene = tempControls;
        app.stage.addChild(tempControls);
    }
    else
        tempControls.updateAlpha( 1 / app.ticker.FPS);

    if(tempControls.finished){
        app.ticker.remove(controlsFade);
        tempControls.destroy();
        sceneManager.startScene(mainMenuScene);
        // mainMenuScene.visible = true;
        // sceneManager.currentScene = mainMenuScene;
        app.ticker.add(gameLoop);
    }    
}

function setupScenes(){
    setupMainMenu();
    setupOptions();
    setupControls();
    setupSelection();
    setupGame();
}

function setupMainMenu(){
    mainMenuScene = new MainMenuScene();
    stage.addChild(mainMenuScene);
    sceneManager.scenes.push(mainMenuScene);
    mainMenuScene.visible = false;
}

function setupOptions(){
    optionsScene = new OptionsOverlay("scene");
    optionsScene.visible = false;
    stage.addChild(optionsScene);
    sceneManager.scenes.push(optionsScene);
}

function setupControls(){
    controlsScene = new ControlsOverlay();
    controlsScene.visible = false;
    stage.addChild(controlsScene);
    sceneManager.scenes.push(controlsScene);
}

function setupSelection(){
    selectionScene = new SelectionScene();
    selectionScene.visible = false;
    stage.addChild(selectionScene);
    sceneManager.scenes.push(selectionScene);
}

function setupGame(){
    //Create the game scene
    gameScene = new GameScene();
    gameScene.visible = false;
    stage.addChild(gameScene);
    sceneManager.scenes.push(gameScene);
}

function startBasic(){bulletType = "basic";startGame();}
function startRocket(){bulletType = "rocket";startGame();}
function startRubber(){bulletType = "rubber";startGame();}

function startMainMenu(){
    bulletType = "";
    sceneManager.transitionScene(mainMenuScene);
}

function backMainMenu(){
    bulletType = "";
    sceneManager.transitionScene(mainMenuScene, "backward");
}

function startOptions(){
    sceneManager.transitionScene(optionsScene);
}

function startControls(){
    console.log(sceneManager.currentScene);
    sceneManager.transitionScene(controlsScene);
    controlsScene.reset();
    app.ticker.add(controlsManage);
}

function controlsManage(){
    controlsScene.manage();
}

function startSelection(){
    sceneManager.transitionScene(selectionScene);
}

//Starts a new game/run
function startGame() {
    if(bulletType != ""){
        levelManager = new LevelManager(64, 18, 12, 24, 120);    
        tileManager = new TileManager(64, 18, 12, 24, 120);
        enemyManager = new EnemyManager(18, 12, 24, 120);
        playerManager = new PlayerManager(18, 12, 24, 120);    

        playerManager.bulletType = bulletType;
        playerTank = playerManager.createPlayer(); 

        //If cheats enabled
        if(maxHealthCheatEnabled)
            playerTank.maxHealth = 8;
        playerTank.currentHealth = playerTank.maxHealth;

        if(maxUpgradesCheatEnabled){
            audioManager.sfxOn = false;
            playerManager.smallUpgradePoints = 99;
            playerManager.bigUpgradePoints = 99;

            for(let i = 0; i < 24; i++){
                upgradeManager.smallUpgrade("bounce");
                upgradeManager.smallUpgrade("speed");
                upgradeManager.smallUpgrade("ammo");
                upgradeManager.smallUpgrade("size");

                upgradeManager.bigUpgrade("movement");
                upgradeManager.bigUpgrade("special");
            }
            playerManager.smallUpgradePoints = 0;
            playerManager.bigUpgradePoints = 0;
            audioManager.sfxOn = sfxEnabled;
        }

        gameScene.setupOverlay();
        sceneManager.setupOverlays();

        gameScene.startMode();

        //sceneManager.updateScene(gameScene);
        sceneManager.transitionScene(gameScene);
    }
}

function giveMaxUpgrades(){
    playerManager.smallUpgradePoints = 99;
    playerManager.bigUpgradePoints = 99;

    for(let i = 0; i < 24; i++){
        upgradeManager.smallUpgrade("bounce");
        upgradeManager.smallUpgrade("speed");
        upgradeManager.smallUpgrade("ammo");
        upgradeManager.smallUpgrade("size");

        upgradeManager.bigUpgrade("movement");
        upgradeManager.bigUpgrade("special");
    }
    playerManager.smallUpgradePoints = 0;
    playerManager.bigUpgradePoints = 0;
}

function resetUpgrades(){
    playerManager.smallUpgradePoints = 0;
    playerManager.bigUpgradePoints = 0;

    for(let i = 0; i < 24; i++){
        upgradeManager.smallUpgrade("bounce");
        upgradeManager.smallUpgrade("speed");
        upgradeManager.smallUpgrade("ammo");
        upgradeManager.smallUpgrade("size");

        upgradeManager.bigUpgrade("movement");
        upgradeManager.bigUpgrade("special");
    }
}

//Primary game loop
function gameLoop() {
    mousePosition = app.renderer.plugins.interaction.mouse.global;  
    
    if(keys[keyboard.ESCAPE] && !spamkey && !sceneManager.transitioning){
        if(!paused && gameScene.currentStatus != "paused" && !sceneManager.transitioning)
            gameScene.ui.pause();
        else if(paused && gameScene.currentStatus == "paused")
            sceneManager.pauseOverlay.resume();
    } 
    spamkey = keys[keyboard.ESCAPE];

    if(hitstop > 0){
        hitstop = hitstop - app.ticker.deltaMS;
        return;
    }

    //console.log(gameScene.currentStatus);
    if(paused || gameScene.currentStatus == "paused"){
        if(gameScene.currentStatus == "play"){
            paused = false;
            return;
        }
        return;
    }
    else if(gameScene.currentStatus == "play"){
        paused = false;
        //Calculate "delta time"
        let dt = 1 / app.ticker.FPS;
        if (dt > 1 / 12)
                dt = 1 / 12; 
        if(gameScene.buttonsEnabled){
            levelManager.timeElapsed = (levelManager.timeElapsed + app.ticker.elapsedMS);
        }

        playerManager.playerInput(dt, app);
        initialUpdate(dt);
        physicsUpdate(dt);
        lateUpate(dt);
        UIUpdate(dt);

        cleanUp();

        checkClear();
    }    
}

function initialUpdate(dt = 1/60){
    playerTank.initialUpdate(dt, mousePosition.x, mousePosition.y);
    for (let et of enemyTanks)
        et.initialUpdate(dt, playerTank.x, playerTank.y);
    for(let b of bullets)
        b.initialUpdate();
}

function physicsUpdate(dt = 1/60){
    playerTank.physicsUpdate(dt);
    for (let et of enemyTanks)
        et.physicsUpdate(dt);
    for (let b of bullets)
        b.physicsUpdate(dt);
}

function lateUpate(dt = 1/60){
    playerTank.lateUpdate(dt);
    for (let et of enemyTanks)
        et.lateUpdate(dt);
    for (let b of bullets)
        b.lateUpdate(dt);
}

function UIUpdate(dt = 1/60){
    gameScene.ui.updateDisplay();
    //gameScene.updateOverlay();
}

function checkClear(){
    // Check if player died
    if (playerTank.currentHealth <= 0) {
        console.log("die");
        gameScene.levelFail();
        return;
    }

    //If all enemies were cleared, proceed to next level
    if (enemyTanks.length <= 0) {
        //console.log(gameScene.currentMode);
        gameScene.levelClear();
        return;
    }
}



//Cleans up any dead things to free up memory on the current level
function cleanUp(){

    //Sort all dead things into arrays
    // let deadBullets = bullets.filter(b => !b.isAlive);
    // let deadEnemyBullets = enemyBullets.filter(eb => !eb.isAlive);
    // let deadPlayerBullets = playerBullets.filter(pb => !pb.isAlive);
    // let deadEnemyTanks = enemyTanks.filter(et => !et.isAlive);
    // let deadBulletExplosions = bulletExplosions.filter(be => !be.isAlive);
    // let deadTankExplosions = tankExplosions.filter(te => !te.isAlive);

    //Cleans up anything dead from the arrays
    bullets = bullets.filter(b => b.isAlive);
    enemyBullets = enemyBullets.filter(eb => eb.isAlive);
    playerBullets = playerBullets.filter(pb => pb.isAlive);
    enemyTanks = enemyTanks.filter(et => et.isAlive);
    bulletExplosions = bulletExplosions.filter(be => be.isAlive);
    tankExplosions = tankExplosions.filter(te => te.isAlive);

    // for(let o of deadBullets){o.destroy();}    
    // for(let o of deadEnemyBullets){o.destroy();}    
    // for(let o of deadPlayerBullets){o.destroy();}    
    // for(let o of deadEnemyTanks){o.destroy();}    
    // for(let o of deadBulletExplosions){o.destroy();}    
    // for(let o of deadTankExplosions){o.destroy();}    
}

//Destroys and removes everything in the scene
function cleanLevel(){
    enemyTanks.forEach(et => gameScene.removeChild(et.tread));
    enemyTanks.forEach(et => gameScene.removeChild(et.turret));
    enemyTanks.forEach(et => gameScene.removeChild(et));
    enemyTanks = [];


    gameScene.removeChild(playerTank.tread);
    gameScene.removeChild(playerTank.turret);
    gameScene.removeChild(playerTank);

    bullets.forEach(b => {
        gameScene.removeChild(b.trail.rope);
        gameScene.removeChild(b.trail);
        gameScene.removeChild(b);
    });
    bullets = [];

    // enemyBullets.forEach(eb => gameScene.removeChild(eb));
    // enemyBullets = [];

    // playerBullets.forEach(pb => gameScene.removeChild(pb));
    // playerBullets = [];

    tileManager.tiles.forEach(t => gameScene.removeChild(t));
    tileManager.groundTiles.forEach(gt => gameScene.removeChild(gt));
}

//When the player dies, reset variabels and show game over
function end() {
    paused = true;
    cleanLevel();

    //Goes to the game over screen
    sceneManager.updateScene(gameOverScene);
}