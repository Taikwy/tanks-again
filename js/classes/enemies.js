
class EnemyManager{
    constructor(width = 0, height = 0, xOffset = 0, yOffset = 0){
        this.xOffset = xOffset;
        this.yOffset = yOffset;
        this.width = width;
        this.height = height;

        this.numEnemies = 0;
        this.threatLevel = 0;

        this.enemyPrefabs = [];
        this.enemyTypes = [11, 12, 13, 21, 22, 23, 31, 32, 33, 41, 42, 43, 51, 52, 53];
        this.levelEnemies = [];

        this.movementPrefabs = [];
        this.attackPrefabs = [];

        this.enemyArray = [[]];
        this.enemies = [];

        this.enemySpawns = [];

        this.sectionOne;
        this.sectionTwo;
        this.sectionThree;
        this.sectionFour;
        this.sectionFive;
        this.sectionNumEnemies = [];

        this.setupEnemies();
        this.setupMovement();
        this.setupAttacks();
        this.setupSpawns();
    }

    setupEnemies(){
        let tankSprite;
        let treadSprite;
        let turretSprite;
    //GRAY ---------------------------------------------------------------------------------
        tankSprite = loadSpriteSheet("bodies.png", 1, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*1, 64, 64);
        this.enemyPrefabs["gray"] = [tankSprite, treadSprite, turretSprite, "basic", 1];

        tankSprite = loadSpriteSheet("bodies.png", 2, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*2, 64, 64);
        this.enemyPrefabs["darkGray"] = [tankSprite, treadSprite, turretSprite, "basicPlus", 1];
    //GREEN -------------------------------------------------------------------------------
        tankSprite = loadSpriteSheet("bodies.png", 3, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 2, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*3, 64, 64);
        this.enemyPrefabs["green"] = [tankSprite, treadSprite, turretSprite, "rubber", 1];

        tankSprite = loadSpriteSheet("bodies.png", 4, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 2 , 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*4, 64, 64);
        this.enemyPrefabs["pine"] = [tankSprite, treadSprite, turretSprite, "rubberPlus", 1];
    //TEAL ------------------------------------------------------------------------------------- 
        tankSprite = loadSpriteSheet("bodies.png", 5, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*5, 64, 64);
        this.enemyPrefabs["teal"] = [tankSprite, treadSprite, turretSprite, "rocket", 1];

        tankSprite = loadSpriteSheet("bodies.png", 6, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 0, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*6, 64, 64);
        this.enemyPrefabs["darkTeal"] = [tankSprite, treadSprite, turretSprite, "rocketPlus", 1];
    //ORANGE ---------------------------------------------------------------------------------------
        tankSprite = loadSpriteSheet("bodies.png", 7, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*7, 64, 64);
        this.enemyPrefabs["yellow"] = [tankSprite, treadSprite, turretSprite, "rubberPlusPlus", 2];

        tankSprite = loadSpriteSheet("bodies.png", 8, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*8, 64, 64);
        this.enemyPrefabs["orange"] = [tankSprite, treadSprite, turretSprite, "rubberPlusPlusPlus", 4];
    //RED ---------------------------------------------------------------------------------------
        tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 4, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);
        this.enemyPrefabs["red"] = [tankSprite, treadSprite, turretSprite, "rocketPlusPlus",2];

        tankSprite = loadSpriteSheet("bodies.png", 10, 40, 40, 4);
        treadSprite = loadSpriteSheet("treads.png", 4, 48, 48, 4);
        turretSprite = loadSprite("turrets.png", 0, 64*10, 64, 64);
        this.enemyPrefabs["darkRed"] = [tankSprite, treadSprite, turretSprite, "rocketPlusPlusPlus",3];
    //BLACK -------------------------------------------------------------------------------------------------------------------------------
        // tankSprite = loadSpriteSheet("bodies.png", 2, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*2, 64, 64);
        // this.enemyPrefabs["black"] = [tankSprite, treadSprite, turretSprite, 50, "basicPlus"];

        // tankSprite = loadSpriteSheet("bodies.png", 6, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 1, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*6, 64, 64);
        // this.enemyPrefabs["blackGreen"] = [tankSprite, treadSprite, turretSprite, 125, "basicPlusPlus"];

        // tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);
        // this.enemyPrefabs["blackTeal"] = [tankSprite, treadSprite, turretSprite, 0];

        // tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);
        // this.enemyPrefabs["blackOrange"] = [tankSprite, treadSprite, turretSprite, 0];

        // tankSprite = loadSpriteSheet("bodies.png", 9, 40, 40, 4);
        // treadSprite = loadSpriteSheet("treads.png", 3, 48, 48, 4);
        // turretSprite = loadSprite("turrets.png", 0, 64*9, 64, 64);
        // this.enemyPrefabs["blackRed"] = [tankSprite, treadSprite, turretSprite, 0];        
    }

    setupMovement(){
        //this.movementPrefabs[] = [movement speed, change interval, change variation, chance to stop moving, can keep same direction];
    //GRAY ---------------------------------------------------------------------------------
        this.movementPrefabs["gray"] =        [60, 1.5, 1.5, 0.3, true, 1];
        this.movementPrefabs["darkGray"] =    [75, 1, 1.5, 0.25, true, 3];
    //GREEN -------------------------------------------------------------------------------
        this.movementPrefabs["green"] =       [60, .5, 2, .1, true, 5];
        this.movementPrefabs["pine"] =        [80, .5, 1.5, .1, true, 10];
    //TEAL ------------------------------------------------------------------------------------- 
        this.movementPrefabs["teal"] =        [100, 1, .5, 0, false, 7];
        this.movementPrefabs["darkTeal"] =    [100, 1, .5, 0, false, 15];
    //ORANGE ---------------------------------------------------------------------------------------
        this.movementPrefabs["yellow"] =      [60, 1.5, 0, 0.6, true, 20];
        this.movementPrefabs["orange"] =      [50, 1.5, 0, 0.6, true, 25];
    //RED ---------------------------------------------------------------------------------------
        this.movementPrefabs["red"] =         [120, .5, 1.5, 0, true, 32];
        this.movementPrefabs["darkRed"] =     [200, 1, 1, 0, false, 40];
    }

    setupAttacks(){
        //this.attackPrefabs[] = [interval, burst, burstsize, burstinterval, interval variance, jitter amount, LOS];
    //GRAY ---------------------------------------------------------------------------------
        this.attackPrefabs["gray"] =        [3, false, 0, 0, 1, 0, false];
        this.attackPrefabs["darkGray"] =    [2, false, 0, 0, 1, 0, false];
    //GREEN -------------------------------------------------------------------------------
        this.attackPrefabs["green"] =       [2, false, 0, 0, 1, 0, false];
        this.attackPrefabs["pine"] =        [1.5, false, 0, 0, 1, 0, false];
    //TEAL ------------------------------------------------------------------------------------- 
        this.attackPrefabs["teal"] =        [1.5, false, 0, 0, 0, 0, false];
        this.attackPrefabs["darkTeal"] =    [1.5, false, 0, 0, 0, 0, false];
    //ORANGE ---------------------------------------------------------------------------------------
        this.attackPrefabs["yellow"] =      [3, true, 4, .2, 1, 80, false];
        this.attackPrefabs["orange"] =      [2, true, 6, .15, 8, 140, false];
    //RED ---------------------------------------------------------------------------------------
        this.attackPrefabs["red"] =         [1.5, false, 0, 0, .5, 0, true];
        this.attackPrefabs["darkRed"] =     [1.5, true, 2, 0.1, .25, 0, true];
        //this.attackPrefabs["darkRed"] =     [.5, false, 5, 0.15, 0, 0, true];
    }

    setupSpawns(){
        this.enemySpawns["white"] = [[],[],[],[],[]];
        this.enemySpawns["purple"] = [[],[],[],[],[]];
        this.enemySpawns["green"] = [[],[],[],[],[]];
        this.enemySpawns["red"] = [[],[],[],[],[]];
        this.enemySpawns["blue"] = [[],[],[],[],[]];


        //
        //BLACK =======================================================
        this.enemySpawns["white"][0] = [[2],[11],               [11]];
        this.enemySpawns["white"][1] = [[3],[21],               [11,21]];
        this.enemySpawns["white"][2] = [[3],[12],               [21,12]];
        this.enemySpawns["white"][3] = [[4],[21,12],              [11,21,12]];
        this.enemySpawns["white"][4] = [11, 21, 12, 12, 21];
        //DEBUGGGGGG------------------------------
        this.enemySpawns["white"][8] = [[3],[21,21,22,22],              [11]];
        //BLUE =====================================================
        this.enemySpawns["blue"][0] = [[3],[31],                [21,31]];
        this.enemySpawns["blue"][1] = [[3],[],                  [21,31]];
        this.enemySpawns["blue"][2] = [[4],[22],                [21,22]];
        this.enemySpawns["blue"][3] = [[4],[22,22],             [12,31,22]];
        this.enemySpawns["blue"][4] = [21, 21, 31, 31, 22];
        //RED =====================================================
        this.enemySpawns["red"][0] = [[4],[32,32],              [31,32]];
        this.enemySpawns["red"][1] = [[5],[31,32],              [31,22,32]];
        this.enemySpawns["red"][2] = [[5],[41,41],              [32,41]];
        this.enemySpawns["red"][3] = [[6],[32,41,41],                   [22,32,41]];
        this.enemySpawns["red"][4] = [22,22,32,32,41,41];
        //GREEN =====================================================
        this.enemySpawns["green"][0] = [[4],[51],               [51,32]];
        this.enemySpawns["green"][1] = [[5],[41,51,51],                 [32,41,51]];
        this.enemySpawns["green"][2] = [[4],[51,51],                 [41,51]];
        this.enemySpawns["green"][3] = [[5],[42,42,42],               [41,42,51]];
        this.enemySpawns["green"][4] = [32,32,42,42,42,42];
        //PURPLE =====================================================
        this.enemySpawns["purple"][0] = [[3],[52],              [52]];
        this.enemySpawns["purple"][1] = [[6],[51,51,52],                [51,52]];
        this.enemySpawns["purple"][2] = [[6],[42,52,52],                [51,42,52]];
        this.enemySpawns["purple"][3] = [[6],[42,52,52],                [51,42,52]];
        this.enemySpawns["purple"][4] = [42,42,52,52,52,52];
    }

    setSections(){
        this.sectionOne = [];
        this.sectionTwo = [];
        this.sectionThree = [];
        this.sectionFour = [];
        this.sectionFive = [];
        for(let r = 1; r < 7; r++){
            let row = [];
            for(let c = 1; c < 7; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionOne.push(row);
        }
        for(let r = 1; r < 6; r++){
            let row = [];
            for(let c = 7; c < 11; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionTwo.push(row);
        }
        for(let r = 1; r < 6; r++){
            let row = [];
            for(let c = 11; c < 17; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionThree.push(row);
        }
        for(let r = 6; r < 11; r++){
            let row = [];
            for(let c = 7; c < 11; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionFour.push(row);
        }
        for(let r = 6; r < 11; r++){
            let row = [];
            for(let c = 11; c < 17; c++){
                row.push(levelManager.tileArray[r][c]);
            }
            this.sectionFive.push(row);
        }
    }

    setEnemies(enemyArray){
        this.resetEnemies();
        this.enemyArray = enemyArray;
        this.createEnemies();
    }

    spawnEnemies(stage, level){
        this.resetEnemies();
        this.setSections();
        
        let spawnInfo = this.enemySpawns[stage][level];
        let numEnemies = 0;

        if(spawnInfo.length > 3){
            let requiredEnemies = spawnInfo;
            for(let re of requiredEnemies){
                let spawned = false;
                while(!spawned){
                    let r = getRandomInt(1, this.height-1);
                    let c = getRandomInt(1, this.width-1);
                    if(c > 5 || r < 7){
                        if(levelManager.tileArray[r][c] == 0){
                            console.log("tilespawn at " + r + " " + c + " is " + levelManager.tileArray[r][c]);
                            this.enemyArray[r][c] = re;
                            this.levelEnemies.push(re);
                            spawned = true;
                        }
                    }
                }
                
            }
        }
        else{
            let maxEnemies = spawnInfo[0];
            let requiredEnemies = spawnInfo[1];
            let possibleEnemies = spawnInfo[2];

            //Spawns required enemies
            for(let re of requiredEnemies){
                let spawned = false;
                while(!spawned){
                    let r = getRandomInt(1, this.height-1);
                    let c = getRandomInt(1, this.width-1);
                    if(c > 5 || r < 7){
                        if(levelManager.tileArray[r][c] == 0){
                            console.log("tilespawn at " + r + " " + c + " is " + levelManager.tileArray[r][c]);
                            this.enemyArray[r][c] = re;
                            this.levelEnemies.push(re);
                            spawned = true;
                        }
                    }
                }

                // let r = getRandomInt(1, this.height-1);
                // let c = getRandomInt(1, this.width-1);
                // while(c > 5 && r < 7 && levelManager.tileArray[r][c] == 0){
                //     r = getRandomInt(1, this.height-1);
                //     c = getRandomInt(1, this.width-1);
                // }
                // this.enemyArray[r][c] = re;
                // this.levelEnemies.push(re); 
                numEnemies++;                
            }

            //Spawns extra enemies from random pool
            while(numEnemies < maxEnemies){
                let spawned = false;
                while(!spawned){
                    let r = getRandomInt(1, this.height-1);
                    let c = getRandomInt(1, this.width-1);
                    if(c > 5 || r < 7){
                        if(levelManager.tileArray[r][c] == 0){
                            console.log("tilespawn at " + r + " " + c + " is " + levelManager.tileArray[r][c]);
                            let randomIndex = getRandomInt(0, possibleEnemies.length);
                            let randomEnemy = possibleEnemies[randomIndex];

                            this.enemyArray[r][c] = randomEnemy;
                            this.levelEnemies.push(randomEnemy);
                            spawned = true;
                            numEnemies++;
                        }
                    }
                }

                // let r = getRandomInt(1, this.height-1);
                // let c = getRandomInt(1, this.width-1);
                // if(c > 5 || r < 7){
                //     if(levelManager.tileArray[r][c] == 0){
                //         let randomIndex = getRandomInt(0, possibleEnemies.length);
                //         let randomEnemy = possibleEnemies[randomIndex];

                //         this.enemyArray[r][c] = randomEnemy;
                //         this.levelEnemies.push(randomEnemy);
                //         numEnemies++;
                //     }
                // }
            }
        }

        this.createEnemies();
        return this.enemyArray;
    }

    resetEnemies(){
        this.levelEnemies = [];

        this.enemyArray = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.enemies = [];
        this.grays = [];
        this.browns = [];
        this.greens = [];
        this.darkGrays = [];
        this.oranges = [];
        this.pines = [];
        this.blues = [];
    }

    createEnemies(){
        for (let r = 0; r < this.height; r ++) {
            for (let c = 0; c < this.width; c ++) {
                switch(this.enemyArray[r][c]){
                    case 11:
                        this.createTank("gray", c, r);
                        break;
                    case 12:
                        this.createTank("darkGray", c, r);
                        break;
                    case 21:
                        this.createTank("green", c, r);
                        break;
                    case 22:
                        this.createTank("pine", c, r);
                        break;
                    case 31:
                        this.createTank("teal", c, r);
                        break;
                    case 32:
                        this.createTank("darkTeal", c, r);
                        break;
                    case 41:
                        this.createTank("yellow", c, r);
                        break;
                    case 42:
                        this.createTank("orange", c, r);
                        break;
                    case 51:
                        this.createTank("red", c, r);
                        break;
                    case 52:
                        this.createTank("darkRed", c, r);
                        break;
                    //BLACK --------------------------------------------------
                    // case 13:
                    //     this.createTank("black", c, r);
                    //     break;
                    // case 23:
                    //     this.createTank("blackGreen", c, r);
                    //     break;
                    // case 33:
                    //     this.createTank("blackTeal", c, r);
                    //     break;
                    // case 43:
                    //     this.createTank("blackOrange", c, r);
                    //     break; 
                    // case 53:
                    //     this.createTank("blackRed", c, r);
                    //     break;
                }
            }
        }
    }

    createTank(color, x = 0, y = 0){
        let et = new EnemyTank(this.enemyPrefabs[color], this.movementPrefabs[color], this.attackPrefabs[color], 0,0);
        et.changeDirection();
        levelManager.setPosition(et, x, y);
        enemyTanks.push(et);
        gameScene.addChild(et.tread);
        gameScene.addChild(et);
        gameScene.addChild(et.turret); 

        console.log("enemy spawned");
    }
}

//Enemy tank
class EnemyTank extends Tank{
    constructor(enemyPrefab, movementPrefab, attackPrefab, x=0, y=0){
        super(enemyPrefab[0], enemyPrefab[1], enemyPrefab[2], x, y, 1);
        this.animations["move"] = enemyPrefab[0];

        this.currentHealth = enemyPrefab[4];
        
        // movementsd
        this.direction;
        this.speed = movementPrefab[0];        
        this.baseChange = movementPrefab[1];  
        this.changeVariation = movementPrefab[2];  
        this.changeTimer = this.baseChange * Math.random();
        this.stopChance = movementPrefab[3];

        this.sameDirection = movementPrefab[4];

        //How many points player gets for destorying it
        this.points = movementPrefab[5];

        //attack stuffs
        this.bulletType = enemyPrefab[3];

        this.intervalVariance = attackPrefab[4];

		this.isAttacking = false;
        this.attackInterval = attackPrefab[0];
        this.attackCountdown = this.attackInterval;
        
        this.burst = attackPrefab[1];
        this.burstSize = attackPrefab[2];
        this.burstCount = 0;
        this.burstInterval = attackPrefab[3];
        this.burstCountdown = this.burstInterval * Math.random();

        this.aimBehavior = attackPrefab[5];
        this.requireLOS = attackPrefab[6];        

    }

    initialUpdate(dt= 1/60, xPos, yPos){
        this.attackBehavior(dt);
        super.initialUpdate(dt, xPos, yPos);
    }

    physicsUpdate(dt = 1/60){
        //MAP COLL
        for(let t of tileManager.tiles){
            if(handleCollisions(this.tread,t)){
                this.x = this.tread.x;
                this.y = this.tread.y;
                this.changeNewDirection();
            }
        }    
        //enemy tanks
        for(let et of enemyTanks){
            if(this != et){
                AABBCollisions(this,et);
            }
        }

        //PLAYER COLL
        if(handleCollisions(playerTank.tread,this.tread)){
            playerTank.x = playerTank.tread.x;
            playerTank.y = playerTank.tread.y;
        }
        
        //rectColl(playerTank, this);
    }

    move(dt = 1/60){
        this.updateMovement(dt);
        super.move(dt);
    }

    updateMovement(dt = 1/60){
        this.changeTimer -= dt;
        if(this.changeTimer <= 0){
            if(this.sameDirection)
                this.changeNewDirection();
            else
                this.changeDirection();
        }
    }

    changeDirection(){
        this.direction = Math.random()*4;
        if(this.direction>3){
            this.dx = 1;
            this.dy = 0;
        }
        else if(this.direction>2){
            this.dx = -1;
            this.dy = 0;
        }
        else if(this.direction>1){
            this.dx = 0;
            this.dy = 1;
        }
        else{
            this.dx = 0;
            this.dy = -1;
        }
        if(Math.random() < this.stopChance){
            this.dx = 0;
            this.dy = 0;
        }
        this.changeTimer = this.baseChange + this.changeVariation*Math.random() - this.changeVariation/2;
    }

    changeNewDirection(){
        let newDir = Math.random()*4;
        while(Math.floor(newDir) == Math.floor(this.direction))
            newDir = Math.random()*4;
        
        this.direction = newDir;
            
        if(this.direction>3){
            this.dx = 1;
            this.dy = 0;
        }
        else if(this.direction>2){
            this.dx = -1;
            this.dy = 0;
        }
        else if(this.direction>1){
            this.dx = 0;
            this.dy = 1;
        }
        else{
            this.dx = 0;
            this.dy = -1;
        }
        this.changeTimer = this.baseChange + this.changeVariation*Math.random() - this.changeVariation/2;
    }

    changeNotOppositeDir(){
        let newDir = Math.random()*3;
        while(Math.floor(newDir) == Math.floor(this.direction))
            newDir = Math.random()*3;
        
        this.direction = newDir;
            
        if(this.direction>3){
            this.dx = 1;
            this.dy = 0;
        }
        else if(this.direction>2){
            this.dx = -1;
            this.dy = 0;
        }
        else if(this.direction>1){
            this.dx = 0;
            this.dy = 1;
        }
        else{
            this.dx = 0;
            this.dy = -1;
        }
    }

    reflectX(){
        this.dx *= -1;
    }

    reflectY(){
        this.dy *= -1;
    }

    attackBehavior(dt = 1/60){
        //If middle of a burst
        if(this.isAttacking){
            if(this.burstCount >= this.burstSize-1){
                //this.burstCountdown = this.burstInterval;
                this.burstCount = 0;
                this.isAttacking = false;
                return;
            }
            this.burstCountdown -= dt;
            if(this.burstCountdown <= 0){
                this.varyAimDirection(this.aimBehavior);
                this.fireBullet();
                this.burstCountdown = this.burstInterval;
                this.burstCount++;
            }
        }

        this.attackCountdown -= dt;
        if(this.attackCountdown <= 0)
        {
            if(this.requireLOS)
                if(!checkLOS(this.x,this.y, playerTank.x, playerTank.y))
                    return;
            this.fireBullet();
            this.attackCountdown = this.attackInterval + Math.random() * this.intervalVariance;
            
            if(this.burst){
                this.isAttacking = true;
            }       
        }        
    }

    varyAimDirection(variation){
        let fireVect = new Vector(this.x,this.y,playerTank.x + (Math.random()*variation-variation/2),playerTank.y + (Math.random()*variation-variation/2));
        fireVect.normalize();
        this.aimDir = fireVect;
    }    

    takeDamage(damage){
        this.currentHealth -= damage;
    }

    fireBullet(){
        let b;
        switch(this.bulletType){
            case "basic":
                this.shootSFX = audioManager.sfx["tanks"]["eBasicShoot"];
                b = new BasicBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "basicPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eBasicShoot"];
                b = new BasicPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocket":
                this.shootSFX = audioManager.sfx["tanks"]["eRocketShoot"];
                b = new Rocket(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocketPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRocketShoot"];
                b = new RocketPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocketPlusPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRocketShoot+"];
                b = new RocketPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rocketPlusPlusPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRocketShoot+"];
                b = new RocketPlusPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rubber":
                this.shootSFX = audioManager.sfx["tanks"]["eRubberLongBounce"];
                b = new RubberBullet(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rubberPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRubberLongBounce"];
                b = new RubberPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rubberPlusPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRubberLongBounce"];
                b = new RubberPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
            case "rubberPlusPlusPlus":
                this.shootSFX = audioManager.sfx["tanks"]["eRubberLongBounce"];
                b = new RubberPlusPlusPlus(this.x, this.y,this.aimDir.xMagnitude,this.aimDir.yMagnitude,45, this.team);
                break;
        }
        bullets.push(b);
        enemyBullets.push(b);
        gameScene.addChild(b);

        audioManager.playSFX(this.shootSFX);
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
}