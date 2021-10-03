class Tank extends PIXI.AnimatedSprite{
    constructor(tankSprite, treadSprite, turretSprite, x = 0, y = 0, t = 0){
        //Graphics stuff
        super(tankSprite);
        this.animationSpeed = 0.3;
        this.loop = true;
        //Sprites stuff
        this.animations = [];
        this.explosion = loadSpriteSheet("tankexplosion.png", 0, 80, 80, 8);
        //Transform stuff
        this.anchor.set(0.5,0.5);
        this.x = x;
        this.y = y;
        //Collisions
        this.collision = 1;
        //Tank stats
        this.isAlive = true;
        this.team = t;
        this.maxHealth = 1;
        this.currentHealth = this.maxHealth;     
        //Movement
        this.speed = 1;
		this.dx = 0; 
        this.dy = 0; 
        //Bullet
        this.bullet;
        this.bullets = [];        
        //Turret
        this.turret = new Turret(turretSprite,this.x, this.y);
        this.aimDir = new Vector(0,0,0,0);
        //Treads
        this.tread = new Tread(treadSprite, this.x, this.y);

        this.deathSFX = audioManager.sfx["tanks"]["death"];
        this.treadSFX = audioManager.sfx["tanks"]["treads"];
    }
    
    initialUpdate(dt = 1/60, xPos, yPos){
        this.findAimDirection(xPos, yPos);
        this.move();
    }

    physicsUpdate(dt = 1/60){
        this.tread.x = this.x;
        this.tread.y = this.y;
        this.turret.x = this.x;
        this.turret.y = this.y;
    }

    lateUpdate(dt = 1/60){
        this.updateAnim();
        //this.play();
        if(!this.isAlive || this.currentHealth<=0)
        {
            this.health = 0;
            this.isAlive = false;
            audioManager.playSFX(this.deathSFX);
            this.explode();

            gameScene.removeChild(this.tread);
            gameScene.removeChild(this.turret);
            gameScene.removeChild(this);
        }
    }

    move(dt = 1/60){
        this.turret.updateRotation(this.aimDir, this.x, this.y);
        this.x += this.dx * this.speed * dt;
        this.y += this.dy * this.speed * dt;

        this.tread.x = this.x;
        this.tread.y = this.y;
        
        this.treadSFX.rate(this.speed/120);
        if( this.dx == 0 && this.dy  ==0){
            this.treadSFX.stop();

            //console.log("stopppingh??");
            //console.log("speed is 0");
        }
        else if(!this.treadSFX.playing()){
            audioManager.playSFX(this.treadSFX);
            //console.log("playing sfx");
            //console.log(this.dx + " " + this.dy);
        }
    }

    findAimDirection(xPos, yPos){
        let fireVect = new Vector(this.x,this.y,xPos,yPos);
        fireVect.normalize();
        this.aimDir = fireVect;
    }

    explode(){
        let e = new Explosion(this.explosion, this.x, this.y, 1,2);
        gameScene.addChild(e);
        //this.sounds["death"].play();
    }

    reflectX(){}
    reflectY(){}
    updateAnim(){}
}

//Turrets for the tanks
class Turret extends PIXI.Sprite{
    constructor(texture, x=0,y=0){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.radius=0;
        this.x = x;
        this.y = y;

        this.alive=true;
    }

    updateRotation(aimDir, x, y){
        this.rotation = Math.atan2(aimDir.yMagnitude,aimDir.xMagnitude);
        this.x = x;
        this.y = y;
    }
}

class Tread extends PIXI.AnimatedSprite{
    constructor(texture, x=0,y=0){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.scale.set(1);
        this.x = x;
        this.y = y;
        this.collision = 1;
        this.alive=true;
        this.animationSpeed = 0.3;
        this.play();

        this.trackTexture = "treadTrack.png";
        this.tracks = [];
    }

    updateTracks(dx, dy){
        if(dx != 0 || dy != 0){
            let leftX, leftY, rightX, rightY;
            if(dx != 0){
                //Moving right
                if(dx > 0){
                    leftX = this.x - dx * this.width/2;
                    leftY = this.y - this.height/2;

                    rightX = this.x - dx * this.width/2;
                    rightY = this.y + this.height/2;
                    rightY -= 12;
                }
                //Moving left
                else{
                    leftX = this.x - dx * this.width/2;
                    leftY = this.y + this.height/2;
                    leftY -= 12;

                    rightX = this.x - dx * this.width/2;
                    rightY = this.y - this.height/2;  
                }              
            }
            else{
                //Moving down
                if(dy > 0){
                    leftX = this.x + this.width/2;
                    leftY = this.y - dy * this.height/2;  
                    leftX -= 12;

                    rightX = this.x - this.width/2;
                    rightY = this.y - dy * this.height/2;  
                }
                //Moving up
                else{
                    leftX = this.x - this.width/2;
                    leftY = this.y - dy * this.height/2;  

                    rightX = this.x + this.width/2;
                    rightY = this.y - dy * this.height/2; 
                    rightX -= 12; 
                }
            }

            // this.createTrack(leftX, leftY, dx, dy);
            // this.createTrack(rightX, rightY, dx, dy);

            this.createTracks(leftX, leftY, rightX, rightY, dx, dy);
        }
    }

    createTrack(x, y, dx, dy){
        let track = new PIXI.Sprite(loadSprite(this.trackTexture));
        track.x = x;
        track.y = y;
        // if(dx == 0){
        //     track.angle = 90;
        // }
        this.tracks.push(track);
        gameScene.addChild(track);
    }

    createTracks(lx, ly, rx, ry, dx, dy){
        let leftTrack = new PIXI.Sprite(loadSprite(this.trackTexture));
        leftTrack.x = lx;
        leftTrack.y = ly;

        let rightTrack = new PIXI.Sprite(loadSprite(this.trackTexture));
        rightTrack.x = rx;
        rightTrack.y = ry;

        if(dx == 0){
            leftTrack.angle = 270;
            rightTrack.angle = 270;
        }

        this.tracks.push(leftTrack);
        gameScene.addChild(leftTrack);

        this.tracks.push(rightTrack);
        gameScene.addChild(rightTrack);
    }

    destroyTracks(){
        for(let t of this.tracks){
            gameScene.removeChild(t);
        }
        this.tracks = [];
    }
}