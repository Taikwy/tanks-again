class PlayerManager{
    constructor(size = 0, width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.size = size;
        this.width = width;
        this.height = height;
        this.playerTank;

        this.bulletType;

        this.smallUpgradePoints = 0;
        this.bigUpgradePoints = 0;



        //Points logic
        this.scorePoints = 0;
        this.hitsTaken = 0;
        this.hitsTakenTotal = 0;
        this.flawless = true;
        this.flawlessRun = true;
        
        this.tanksDestroyed = 0;
        this.tanksDestroyedTotal = 0;
        this.accurate = true;
        this.accurateRun = true;

        //Upgrades logic ===========================================
        this.upgradeMRank = 0;          //movement upgrade
        this.upgradeHRank = 0;          //health upgrade

        this.upgradeARank = 0;          //first bullet ugprade
        this.upgradeBRank = 0;          //second bullet upgrade
        this.upgradeCRank = 0;          //special bullet upgrade
        
        this.upgradeAMax = false;
        this.upgradeBMax = false;

        this.upgradeACost = 0;
        this.upgradeBCost = 0;        

        this.spawnX;
        this.spawnY;        
    }

    //Creates the sprite arrays for the player
    createPlayer() {
        //let tank = loadSpriteSheet("tanks.png", 0, 48, 48, 4);
        let tankSprite = loadSpriteSheet("bodies.png", 0, 40, 40, 4);
        let treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        let turretSprite = loadSprite("turrets.png", 0, 0, 64, 64);

        this.playerTank = new PlayerTank(tankSprite, treadSprite, turretSprite);
        this.playerTank.setupStats(this.bulletType);

        return this.playerTank;
    }

    spawnPlayer(xIndex = 0, yIndex = 0){
        //Resets the player
        this.playerTank.resetPlayer();
        
        levelManager.setPosition(this.playerTank, xIndex, yIndex);
        
        this.playerTank.play();
        gameScene.addChild(this.playerTank.tread);
        gameScene.addChild(this.playerTank);
        gameScene.addChild(this.playerTank.turret);        
    }

    playerInput(dt = 1/60, game){
        this.playerTank.dx = 0;
        this.playerTank.dy = 0;
        if(keys[keyboard.RIGHT] || keys[keyboard.D]){
                this.playerTank.dx = 1;
        }
        else if(keys[keyboard.LEFT] || keys[keyboard.A]) {
                this.playerTank.dx = -1;
        }
        else if(keys[keyboard.DOWN] || keys[keyboard.S]){
            this.playerTank.dy = 1;
        }
        else if(keys[keyboard.UP] || keys[keyboard.W]) {
            this.playerTank.dy = -1;
        }
              
        this.playerTank.updateAmmo(dt);

        game.view.onclick = this.fireBullet;
    }

    fireBullet(){
        if (playerTank.shotsLeft > 0 && paused == false){
            //console.log("shot fired");
            playerTank.findAimDirection(mousePosition.x, mousePosition.y);
            playerTank.fireBullet();
            playerTank.shotsLeft--;
        } 
    }
}

//Player tank
class PlayerTank extends Tank{
	constructor(tankSprite, treadSprite, turretSprite, x=600, y=400){
        super(tankSprite, treadSprite, turretSprite, x, y, 0);
        this.animations["move"] = tankSprite;
        
        this.maxHealth = 4;
        //this.maxHealth -= 3;
        //this.maxHealth += 9999;
        this.currentHealth = this.maxHealth;
        this.speed = 160;
        //this.speed  += 350;
        
        //Bullet stuff
        this.bulletType;
        this.bulletBounce;
        this.bulletSpeed;
        this.bulletSize;
        this.bulletHealth;
        this.bulletDamage;

        //Multiply for upgrades
        this.baseSpeed;
        this.baseSize;
        
        //Attack stuff
        this.maxShot;
        this.shotsLeft;
        this.reloadTimers = [];
        
        //taking damage
        this.invincible = false;
        this.flickerDuration = 600;
        this.flickerTimer = 0;
        this.flickerInterval = 50;
        this.flickerIntervalTimer = 0;

        
    }

    setupStats(type){
        this.bulletType = type;
        switch(type){
            case "basic":
                this.bulletBounce = 0;
                this.baseSpeed = 400;
                this.bulletSpeed = this.baseSpeed;
                this.maxShots = 4;
                this.reloadDuration = 1.8;

                playerManager.upgradeACost = 2;
                playerManager.upgradeBCost = 2;

                this.shootSFX = audioManager.sfx["tanks"]["basicShoot"];
                
                break;
            case "rocket":
                this.bulletDamage = 1;
                //this.bulletBounce = 0;
                this.baseSpeed = 550;
                //this.baseSpeed += 1000;
                this.bulletSpeed = this.baseSpeed;
                this.maxShots = 2;
                //this.maxShots += 10;
                this.reloadDuration = 1.3;

                playerManager.upgradeACost = 2;
                playerManager.upgradeBCost = 1;

                this.shootSFX = audioManager.sfx["tanks"]["rocketShoot"];
                break;
            case "rubber":
                this.baseSize = .25;
                this.bulletSize = 1.5;
                this.bulletHealth = 1;
                this.bulletBounce = 2;
                this.baseSpeed = 500;
                this.bulletSpeed = this.baseSpeed;
                this.maxShots = 3;
                this.reloadDuration = 1.7;

                playerManager.upgradeACost = 2;
                playerManager.upgradeBCost = 2;

                this.shootSFX = audioManager.sfx["tanks"]["rubberLongBounce"];
                break;
        }
        this.shotsLeft = this.maxShots;
        for(let i = 0; i < this.maxShots; i++){
            this.reloadTimers.push(0);
        }
    }

    updateStats(){
        switch(this.bulletType){
            case "basic":
                this.bulletBounce = 0;
                this.baseSpeed = 300;
                this.bulletSpeed = this.baseSpeed;
                this.reloadDuration = 1.8;
                break;
            case "rocket":
                this.bulletDamage = 1;
                this.baseSpeed = 600;
                this.bulletSpeed = this.baseSpeed;
                this.maxShots = 2;
                break;
            case "rubber":
                this.bulletSize = 1.5;
                this.bulletHealth = 1;
                this.bulletBounce = 1;
                break;
        }
        this.shotsLeft = this.maxShots;
        for(let i = 0; i < this.maxShots; i++){
            this.reloadTimers.push(0);
        }
    }

    resetPlayer(){
        this.shotsLeft = this.maxShots;
        this.reloadTimers = [];
        for(let i = 0; i < this.maxShots; i++){
            this.reloadTimers.push(0);
        }

        this.visible = true;
        this.tread.visible = true;
        this.turret.visible = true;
        this.invincible = false;
        this.flickerTimer = 0;
        this.flickerIntervalTimer = 0;
    }

    updateAmmo(dt = 1/60){
        if(this.shotsLeft < this.maxShots){
            for(let i = 0; i < this.maxShots - this.shotsLeft; i++){
                if(this.reloadTimers[i] < this.reloadDuration){
                    this.reloadTimers[i]+= dt;
                }
            }
            let toRemove = 0;
            for(let i = 0; i < this.reloadTimers.length; i ++){
                if(this.reloadTimers[i] >= this.reloadDuration){
                    this.shotsLeft++;
                    this.reloadTimers[i] = 0;
                    toRemove++;
                    //console.log("RELOADED!");
                }
            }
            for(let i = 0; i < toRemove; i++){
                let temp = this.reloadTimers.shift();
                this.reloadTimers.push(temp);   
                //console.log("shifted");             
            }
        }
    }

    physicsUpdate(dt = 1/60){
        if(this.invincible){
            this.flicker();
        }
        for(let t of tileManager.tiles){
            if(handleCollisions(this.tread,t)){
                this.x = this.tread.x;
                this.y = this.tread.y;
            }            
        }
        for(let et of enemyTanks){
            if(handleCollisions(et.tread,this.tread)){
                // this.x = this.tread.x;
                // this.y = this.tread.y;
                et.x = et.tread.x;
                et.y = et.tread.y;
            }
        }
        super.physicsUpdate();
    }

    flicker(){
        if(this.flickerTimer > 0){
            this.flickerTimer -= app.ticker.deltaMS;
            
            if(this.flickerIntervalTimer > 0){
                this.flickerIntervalTimer -= app.ticker.deltaMS;
            }
            else{
                this.visible = !this.visible;
                this.tread.visible = !this.tread.visible;
                this.turret.visible = !this.turret.visible;
                this.flickerIntervalTimer = this.flickerInterval;
            }                
        }
        else{
            this.visible = true;
            this.tread.visible = true;
            this.turret.visible = true;

            this.flickerTimer = 0;
            this.invincible = false;
        }        
    }

    updateAnim(){
        //Idle anim
        if(this.dx == 0 && this.dy == 0){
            this.tread.stop();
        }
        //Up anim
        else if (this.dy < 0) {
            this.angle = 180;
            this.tread.angle = 180;
            this.tread.play();
        }    
        //Down anim
        else if (this.dy > 0) {
            this.angle = 0;
            this.tread.angle = 0;
            this.tread.play();
        }
        //Left anim
        else if (this.dx < 0) {
            this.angle = 90;
            this.tread.angle = 90;
            this.tread.play();
        }
        //Right anim
        else if (this.dx > 0) {
            this.angle = -90;
            this.tread.angle = -90;
            this.tread.play();
        }
    }
    
    takeDamage(damage){
        if(this.invincible == false){
            this.currentHealth-= damage;
            this.invincible = true;
            hitstop = 200;
            this.flickerTimer = this.flickerDuration;
            this.flickerIntervalTimer = this.flickerInterval;

            //Adds a hit 
            playerManager.hitsTaken++;
            playerManager.hitsTakenTotal++;
            playerManager.flawless = false;
            playerManager.flawlessRun = false;
        }
    }

    fireBullet(){
        //console.log("fire?");
        let b;
        switch(this.bulletType){
            case "basic":
                b = new PBasic(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,32, this.team);
                b.bounce = this.bulletBounce;
                b.speed = this.bulletSpeed;
                
                break;
            case "rocket":
                b = new PRocket(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,32, this.team);
                b.speed = this.bulletSpeed;
                b.damage = this.bulletDamage;
                break;
            case "rubber":
                b = new PRubber(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,32, this.team);
                b.scale.set(this.bulletSize);
                b.health = this.bulletHealth;
                b.bounce = this.bulletBounce;
                b.speed = this.bulletSpeed;
                break;
        }
        
        bullets.push(b);
        playerBullets.push(b);
        gameScene.addChild(b);

        audioManager.playSFX(this.shootSFX);
    }    
}

class UpgradeManager{
    constructor(){
        this.upgrades = [];
        //this.currentUpgrades = [];
        this.small = [];
        this.big = [];
        this.y = 0;
        //audioManager.playSFX(this.smallSFX);
    }

    setupUpgrades(bulletType = "basic"){

        let tempSmall = this.small;
        this.small = [];

        //Small upgrades
        switch(bulletType){
            case "basic":
                this.small.push(tempSmall["bounce"]);
                this.small.push(tempSmall["speed"]);
                break;
            case "rocket":
                this.small.push(tempSmall["ammo"]);
                this.small.push(tempSmall["speed"]);                
                break;
            case "rubber":
                this.small.push(tempSmall["size"]);
                this.small.push(tempSmall["bounce"]);
                break;
        }
        this.small.push(tempSmall["heal"]);

        console.log(this.small);

        this.smallSFX = audioManager.sfx["button"]["smallUpgrade"];
        this.bigSFX = audioManager.sfx["button"]["bigUpgrade"];
        this.heal = audioManager.sfx["button"]["heal"];
        this.fullHeal  = audioManager.sfx["button"]["fullHeal"];
        this.maxHealth = audioManager.sfx["button"]["maxHealth"];
        console.log(this.smallSFX);
    }

    showSmallUpgrades(){
        console.log("show small");
        for(let upgrade of this.small){
            upgrade.visible = true;
        }
        for(let upgrade of this.big){
            upgrade.visible = false;
        }
    }

    showBigUpgrades(){
        console.log("show big");
        for(let upgrade of this.big){
            upgrade.visible = true;
        }
        for(let upgrade of this.small){
            upgrade.visible = false;
        }
    }

    smallUpgrade(type){
        //If player has no lesser points
        if(playerManager.smallUpgradePoints <= 0){
            return;
        }

        let cost = 0;
        let nextCost = 0;

        switch(type){
            case "bounce":
                if(playerManager.bulletType == "rocket" || playerManager.upgradeAMax || playerManager.smallUpgradePoints < playerManager.upgradeACost)
                    return;
                cost = playerManager.upgradeACost;
                if(playerManager.bulletType == "basic"){
                    switch(playerManager.upgradeARank){
                        case 0:
                            playerManager.upgradeACost = 2;
                            break;
                        case 1:
                            playerManager.upgradeACost = 2;
                            break;
                        case 2:
                            playerManager.upgradeAMax = true;
                            break;
                        default:
                            return;
                    }
                }
                else if(playerManager.bulletType == "rubber"){
                    switch(playerManager.upgradeARank){
                        case 0:
                            playerManager.upgradeACost = 2;
                            break;
                        case 1:
                            playerManager.upgradeACost = 2;
                            break;
                        case 2:
                            playerManager.upgradeACost = 3;
                            break;
                        case 3:
                            playerManager.upgradeACost = 3;
                            break;
                        case 4:
                            playerManager.upgradeAMax = true;
                            break;
                        default:
                            return;
                    }
                }
                playerTank.bulletBounce++;
                playerManager.upgradeARank++;
                playerManager.smallUpgradePoints -= cost;

                audioManager.playSFX(this.smallSFX);
                break;
            case "speed":           
                if(playerManager.bulletType == "rubber" || playerManager.upgradeBMax || playerManager.smallUpgradePoints < playerManager.upgradeBCost)
                    return;  
                if(playerManager.bulletType == "basic" && playerManager.upgradeBRank >= 12-1){
                    playerManager.upgradeBMax = true;
                }   
                if(playerManager.bulletType == "rocket" && playerManager.upgradeBRank >= 24-1){
                    playerManager.upgradeBMax = true;
                }
                cost = playerManager.upgradeBCost;

                playerTank.bulletSpeed += playerTank.baseSpeed*.1;
                playerManager.upgradeBRank++;
                playerManager.smallUpgradePoints -= cost;    
                
                audioManager.playSFX(this.smallSFX);
                break;
            case "ammo":
                if(playerManager.bulletType != "rocket" || playerManager.upgradeAMax || playerManager.smallUpgradePoints < playerManager.upgradeACost)
                    return;
                cost = playerManager.upgradeACost;
                switch(playerManager.upgradeARank){
                    case 0:
                        playerManager.upgradeACost = 2;
                        break;
                    case 1:
                        playerManager.upgradeACost = 2;
                        break;
                    case 2:
                        playerManager.upgradeACost = 2;
                        break;
                    case 3:
                        playerManager.upgradeAMax = true;
                        break;
                    default:
                        return;
                }
                
                
                playerTank.maxShots++;
                playerManager.upgradeARank++;
                playerManager.smallUpgradePoints -= cost;

                audioManager.playSFX(this.smallSFX);
                break;
            case "size":
                if(playerManager.bulletType != "rubber" || playerManager.upgradeBMax || playerManager.smallUpgradePoints < playerManager.upgradeBCost)
                    return;  
                if(playerManager.upgradeBRank >= 4-1){
                    playerManager.upgradeBMax = true;
                }

                playerManager.upgradeBCost = 2;

                playerTank.bulletSize += 1.5 * playerTank.baseSize;
                playerManager.upgradeBRank++;
                playerManager.smallUpgradePoints -= playerManager.upgradeBCost;

                audioManager.playSFX(this.smallSFX);
                break;
            case "heal":
                if(playerTank.currentHealth >= playerTank.maxHealth){
                    return;
                }
                playerTank.currentHealth++
                playerManager.smallUpgradePoints-=1;

                audioManager.playSFX(this.heal);
                break;
        }        
        sceneManager.updateOverlays();
    }

    bigUpgrade(type){
        // for(let alert of gameScene.bigUpgradesOverlay.alerts){
        //     alert.makeInvisible();
        // }

        //If player doesn't have any greater points
        if(playerManager.bigUpgradePoints <= 0){
            //gameScene.bigUpgradesOverlay.alerts[1].makeVisible();
            return;
        }

        switch(type){
            case "fullHeal":
                //If player already has full health
                if(playerTank.currentHealth >= playerTank.maxHealth){
                    //gameScene.bigUpgradesOverlay.alerts[3].makeVisible();
                    return;
                }
                playerTank.currentHealth = playerTank.maxHealth;  
                
                audioManager.playSFX(this.fullHeal);
                break;
            case "health":
                //If player already has max health of 8
                if(playerTank.maxHealth >= 8){
                    //gameScene.bigUpgradesOverlay.alerts[2].makeVisible();
                    return;
                }
                playerTank.maxHealth++;
                playerTank.upgradeHRank++;   

                audioManager.playSFX(this.maxHealth);
                break;
            case "movement":
                //If player movement is already maxed out
                if(playerManager.upgradeMRank >= 3){
                    //gameScene.bigUpgradesOverlay.alerts[2].makeVisible();
                    return;
                }
                playerManager.upgradeMRank++;
                playerTank.speed += 75;      
                
                audioManager.playSFX(this.bigSFX);
                break;
        }
        if(type == "special"){
            if(playerManager.upgradeCRank >= 2){
                //gameScene.bigUpgradesOverlay.alerts[2].makeVisible();
                return;
            }
            switch(playerTank.bulletType){
                case "basic":
                    playerManager.upgradeCRank++;
                    playerTank.reloadDuration -= .5;                  
                    break;
                case "rocket":
                    playerManager.upgradeCRank++;
                    playerTank.bulletDamage++;                   
                    break;
                case "rubber":
                    playerManager.upgradeCRank++;
                    playerTank.bulletHealth+=4;                 
                    break;
            }            

            audioManager.playSFX(this.bigSFX);
        }
        playerManager.bigUpgradePoints--;
        sceneManager.updateOverlays();
    }
}