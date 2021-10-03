//Bullet that the characters shoot
class Bullet extends PIXI.Sprite{
    constructor(texture, x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        //Graphics stuff
        super(texture);
        this.explosion;
        this.trail;

        //Transform stuff
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.x = x + dirX*offset;
        this.y = y + dirY*offset;
        this.dx = dirX;
        this.dy = dirY;
        //this.direction = {x:dirX,y:dirY};
        this.rotation = Math.atan2(this.dy, this.dx);

        //Stats
        this.isAlive = true;
        this.team = team;
        this.speed = 350;
        this.damage = 1;
        this.health = 1;        
        this.distanceTravelled = 0;
        this.maxDistance = 1500;

        this.trail;
        
        this.eInterval;


        this.bounceSFX = audioManager.sfx["tanks"]["rubberShortBounce"];
        //this.deathSFX = audioManager.sfx["tanks"]["mediumBackClick"];
    }

    move(dt=1/60){
        let x = this.dx * this.speed * dt;
        let y = this.dy * this.speed * dt;
        this.x += x;
        this.y += y;
        this.distanceTravelled += Math.sqrt( Math.pow(x,2) + Math.pow(y,2) );
    }    

    reflectX(){
        this.dx *= -1;
        this.rotation = Math.atan2(this.dy, this.dx);
    }

    reflectY(){
        this.dy *= -1;
        this.rotation = Math.atan2(this.dy, this.dx);
    }

    initialUpdate(dt){
        if(vfxEnabled)
            this.updateTrail(dt);
        this.move(dt);
        if(this.distanceTravelled >= this.maxDistance)
            this.isAlive = false;
    }

    physicsUpdate(dt = 1/60){
        //If player bullet
        if(this.team == 0){
            for (let et of enemyTanks) {
                if (rectsIntersect(this, et)){
                    et.takeDamage(this.damage);
                    this.isAlive = false;

                    playerManager.tanksDestroyed++;  
                    playerManager.tanksDestroyedTotal++;   
                    playerManager.scorePoints += et.points;       
                    //console.log("hit an enemy tank");
                }
            }
            for (let eb of enemyBullets) {
                if (!hasSeparatingAxis(this, eb)) {
                    this.takeDamage(this.damage);
                    eb.isAlive = false;
                    // bulletExpl.play();     

                    //console.log("hitting enemy bullet");
                }
            }
        }
        //If enemy bullet
        if(this.team == 1){
            if (rectsIntersect(playerTank, this)) {
                playerTank.takeDamage(this.damage);
                //this.takeDamage(playerTank);
                this.isAlive = false;

                //bulletExpl.play();
            }
            for (let pb of playerBullets) {
                if (!hasSeparatingAxis(this, pb)) {
                    this.isAlive = false;
                    pb.takeDamage(this.damage);
                    //pb.takeDamage();
                    // bulletExpl.play();     
                }
            }
        }
        //Checks if the bullet will bounce or explode
        for(let t of tileManager.tiles){
            if(bulletColl(this,t)){
                // console.log("bulloverlap");
                if(this.bounce>0){
                    this.bounce--
                    this.move(dt);

                    audioManager.playSFX(this.bounceSFX);
                }
                else{
                    //If player bullet, means no longer accurate
                    if(this.team == 0){
                        playerManager.accurate = true;
                        playerManager.accurateRun = true;
                    }
                    this.isAlive = false;
                    // bulletExpl.play();
                }
            }
        }
    }

    lateUpdate(dt=1/60){
        if(!this.isAlive || this.health<=0){
            // if(this.team==0)
            //     console.log(this.health);
            this.health = 0;
            this.isAlive = false;

            audioManager.playSFX(this.deathSFX);
            this.explode();

            gameScene.removeChild(this.trail.rope); 
            gameScene.removeChild(this.trail); 
            gameScene.removeChild(this);   
        }            
    }

    takeDamage(damage){
        this.health-= damage;
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1,1.5);
        gameScene.addChild(e);
    }
}

//PLAYER BULLETS =============================================================================
class PBasic extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("pbasic.png"), x,y, dirX, dirY, offset, team);

        this.maxDistance = 2500;

        this.trail = new Trail(loadSprite("bluelargetrail.png"), this.x, this.y, 15, 1.75);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("blueexplosions.png", 0, 32, 32, 7);
        
        this.bounceSFX = audioManager.sfx["tanks"]["basicBounce"];
        this.deathSFX =  audioManager.sfx["tanks"]["basicDeath"];
    }
    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
    }
    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1,1);
        gameScene.addChild(e);
    }
}

class PRocket extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("procket.png"), x,y, dirX, dirY, offset, team);
        
        this.scale.set(1.1);

        this.trail = new Trail(loadSprite("bluetrail.png"), this.x, this.y, 10, 1);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("playerrocket.png", 0, 32, 32, 7);
        this.trailExplosion = loadSpriteSheet("blueexplosions.png", 0, 32, 32, 7);
        //this.explosion = loadSpriteSheet("rocketexplosion.png", 0, 32, 32, 7);

        this.deathSFX =  audioManager.sfx["tanks"]["rocketDeath"];
    }

    updateTrail(dt = 1/60){
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, 1,.8);
            gameScene.addChild(e);
            this.eInterval = 1 / this.speed;
        }
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1.5, playerTank.bulletSpeed/400);
        gameScene.addChild(e);
    }
}

class PRubber extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("psmall.png"), x,y, dirX, dirY, offset, team);

        this.maxDistance = 3000;

        this.trail = new Trail(loadSprite("bluetrail.png"), this.x, this.y, 15, .7);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("bluerubber.png", 0, 32, 32, 7);
        this.trailExplosion = loadSpriteSheet("bluerubber.png", 0, 32, 32, 7);

        this.bounceSFX = audioManager.sfx["tanks"]["rubberShortBounce"];
        this.deathSFX =  audioManager.sfx["tanks"]["rubberDeath"];
    }

    updateTrail(dt = 1/60){
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, .5, .25*playerTank.bulletSize);
            gameScene.addChild(e);
            this.eInterval = 60;
        }
    }

    explode(){
        let e = new Explosion(this.trailExplosion, this.x, this.y, 1, playerTank.bulletSize - .3);
        gameScene.addChild(e);
    }
}

//ENEMY BULLETS=======================================================================================================================
//Basic Bullets -------------------------------------------------------------
class BasicBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("basicBullet.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 2;
        this.speed = 300;

        this.trail = new Trail(loadSprite("blacklargetrail.png"), this.x, this.y, 10, 1.6);
        gameScene.addChild(this.trail.rope);


        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        
        this.bounceSFX = audioManager.sfx["tanks"]["eBasicBounce"];
        this.deathSFX =  audioManager.sfx["tanks"]["eBasicDeath"];
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
    }
}

class BasicPlus extends BasicBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 1;
        this.scale.set(1.1);
        this.maxDistance = 1500;

        this.trail = new Trail(loadSprite("blacklargetrail.png"), this.x, this.y, 15, 1.8);
        gameScene.addChild(this.trail.rope);
    }
}
//Rockets -------------------------------------------------------------------
class Rocket extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("rocket.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 0;
        this.speed = 600;

        this.trail = new Trail(loadSprite("teallargetrail.png"), this.x, this.y, 10, 1.25);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("tealrocket.png", 0, 32, 32, 7);
        this.trailExplosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        
        this.deathSFX =  audioManager.sfx["tanks"]["eRocketDeath"];
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, 1.25, .6);
            gameScene.addChild(e);
            this.eInterval = 25;
        }
    }
}

class RocketPlus extends Rocket{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 800;

        this.trail = new Trail(loadSprite("teallargetrail.png"), this.x, this.y, 12, 1.5);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("rocketexplosion.png", 0, 32, 32, 7);
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, 2, 1);
            gameScene.addChild(e);
            this.eInterval = 50;
        }
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1 ,2);
        gameScene.addChild(e);
    }
}

class RocketPlusPlus extends Rocket{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 900;
        this.scale.set(1.2)

        this.trail = new Trail(loadSprite("redlargetrail.png"), this.x, this.y, 20, 2.25);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("redrocket.png", 0, 32, 32, 7);
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10, 1.8, .8);
            gameScene.addChild(e);
            e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10, 1.8, .8);
            gameScene.addChild(e);
            e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10,  1.8, .8);
            gameScene.addChild(e);
            this.eInterval = 60;
        }
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1.2,3);
        gameScene.addChild(e);
    }
}

class RocketPlusPlusPlus extends Rocket{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 900;
        this.scale.set(1.2)

        this.trail = new Trail(loadSprite("redlargetrail.png"), this.x, this.y, 20, 2.25);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("redrocket.png", 0, 32, 32, 7);

        this.damage = 2;

        this.deathSFX =  audioManager.sfx["tanks"]["eRocketDeath+"];
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10, 1.8, .8);
            gameScene.addChild(e);
            e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10, 1.8, .8);
            gameScene.addChild(e);
            e = new Explosion(this.trailExplosion, this.x + Math.random()*20-10, this.y + Math.random()*20-10,  1.8, .8);
            gameScene.addChild(e);
            this.eInterval = 60;
        }
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1.2,3);
        gameScene.addChild(e);
    }
}


//Rubber ---------------------------------------------------------------------
class RubberBullet extends Bullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(loadSprite("smallBullet.png"), x,y, dirX, dirY, offset, team);
        // variables
        this.bounce = 1;
        this.speed = 300;
        this.scale.set(1.4);
        this.maxDistance = 2000;

        this.trail = new Trail(loadSprite("trail.png"), this.x, this.y, 20);
        gameScene.addChild(this.trail.rope);

        this.explosion = loadSpriteSheet("bulletexplosion.png", 0, 32, 32, 7);
        this.trailExplosion = loadSpriteSheet("greenrubber.png", 0, 32, 32, 7);
        
        this.bounceSFX = audioManager.sfx["tanks"]["eRubberShortBounce"];
        this.deathSFX =  audioManager.sfx["tanks"]["eRubberDeath"] ;
    }

    updateTrail(dt = 1/60){
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, .75, .4);
            gameScene.addChild(e);
            this.eInterval = 70;
        }
    }

    explode(){
        let e = new Explosion(this.trailExplosion, this.x, this.y, 1, 1);
        gameScene.addChild(e);
    }

    loadSounds(){
        this.sounds["explode"] = loadSound('sounds/shortexpl.wav', .05);
    }
}

class RubberPlus extends RubberBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.bounce = 2;
        this.speed = 250;
        this.scale.set(1.75);
        this.maxDistance = 2000;

        this.trailExplosion = loadSpriteSheet("darkgreenrubber.png", 0, 32, 32, 7);
    }

    updateTrail(dt = 1/60){
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosion, this.x, this.y, .3, .4);
            gameScene.addChild(e);
            this.eInterval = 70;
        }
    }

    explode(){
        let e = new Explosion(this.trailExplosion, this.x, this.y, 1, 1);
        gameScene.addChild(e);
    }
    
}

class RubberPlusPlus extends RubberBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 200;
        this.bounce = 3;
        this.maxDistance = 1800;

        this.trailExplosion = loadSpriteSheet("yellowrubber.png", 0, 32, 32, 7);
        this.trailExplosionAlt = loadSpriteSheet("orangerubber.png", 0, 32, 32, 7);
    }

    updateTrail(dt = 1/60){
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosionAlt, this.x, this.y, 1, .3);
            gameScene.addChild(e);
            e =        new Explosion(this.trailExplosion, this.x + Math.random()*12-6, this.y + Math.random()*12-6, 1.15, .3);
            gameScene.addChild(e);
            this.eInterval = 90;
        }
    }

    explode(){
        let e = new Explosion(this.trailExplosion, this.x, this.y, 1.3, 1);
        gameScene.addChild(e);
    }
}

class RubberPlusPlusPlus extends RubberBullet{
    constructor(x=0,y=0, dirX = 0, dirY = 0, offset = 0, team = 0){
        super(x,y, dirX, dirY, offset, team);
        this.speed = 250;
        this.bounce = 3;
        this.scale.set(1.9);
        this.maxDistance = 1400;

        this.trail = new Trail(loadSprite("orangelargetrail.png"), this.x, this.y, 10, 2.5);
        gameScene.addChild(this.trail.rope);

        this.trailExplosion = loadSpriteSheet("yellowrubber.png", 0, 32, 32, 7);
        this.trailExplosionAlt = loadSpriteSheet("orangerubber.png", 0, 32, 32, 7);
        this.trailExplosionAltAlt = loadSpriteSheet("redrubber.png", 0, 32, 32, 7);
    }

    updateTrail(dt = 1/60){
        this.trail.updatePoints(this.x, this.y);
        if(this.eInterval > 0){
            this.eInterval = this.eInterval - app.ticker.deltaMS;
        }
        else{
            let e = new Explosion(this.trailExplosionAltAlt, this.x + Math.random()*16-8, this.y + Math.random()*12-6, 1.5, .2);
            gameScene.addChild(e);
            e =        new Explosion(this.trailExplosionAlt,  this.x + Math.random()*16-8, this.y + Math.random()*12-6, 1, .2);
            gameScene.addChild(e);
            e =        new Explosion(this.trailExplosion, this.x + Math.random()*16-8, this.y + Math.random()*12-6, 1.5, .2);
            gameScene.addChild(e);
            this.eInterval = 90;
        }
    }

    explode(){
        let e = new Explosion(this.trailExplosionAlt, this.x, this.y, 1.25, 1.5);
        gameScene.addChild(e);
    }
}