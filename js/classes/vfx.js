class Progress extends PIXI.Container{
    constructor(){
        super();
        this.frame = new ProgressFrame();
        this.bar = new PIXI.Sprite(loadSprite("assets/images/progressbar.png", 0, 0, 448, 32));
        this.barXOrigin = -72;              //376
        this.bar.x = this.barXOrigin;
        this.bar.y = 400;
        
        this.addChild(this.bar);
        this.addChild(this.frame);
        //this.addChild(this.bar);
    }
    updateBar(percent){
        this.bar.x = this.barXOrigin + percent * 448;
        console.log(percent);
    }
}

class ProgressFrame extends PIXI.AnimatedSprite{
    constructor(){
        super(loadSpriteSheetRows("assets/images/progressframe.png", 1, 300, 225, 8, 8));
        this.x = 0;
        this.y = 0;

        this.animationSpeed = .225;
        this.scale.set(4);
        this.loop = true;

        this.play();        
    }    
}

class Fade extends PIXI.Sprite{
    constructor(texture){
        super(texture);
        this.alpha = 0;
    }

    updateAlpha(alphaChange){
        //console.log(alphaChange);
        this.alpha += alphaChange;
        //console.log(this.alpha);
    };
}

class Anim extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, speed, scale){
        super(texture);
        this.x = x;
        this.y = y;

        this.animationSpeed = speed;
        this.scale.set(scale);
        this.loop = false;

        this.play();
    }
}

class UIAnim{
    constructor(anim, final, overlay, x = 0, y = 0, speed, scale){
        this.animTexture = anim;
        this.finalSprite = final;
        this.overlay = overlay;

        this.x = x;
        this.y = y;
        this.speed = speed;
        this.scale = scale;

        this.anim;

        this.active = true;
        this.interrupted = false;
    }

    //Starts the animation
    open(){    
        //console.log("yoink");
            
        this.anim = new Anim(this.animTexture, this.x, this.y, this.speed, this.scale);
        this.overlay.addChild(this.anim);
        this.active = true;
        this.interrupted = true;

        this.anim.onComplete = e => {
            //If no button was pressed midway through
            // if(!this.interrupted){
                
            // }   
            
            // if(this.active){
            //     console.log("active");
            //     this.overlay.removeChild(this.anim);
            //     this.overlay.addChild(this.finalSprite);
            // }                 
            //this.overlay.removeChild(this.anim);        
        };
    }

    remove(){
        this.overlay.removeChild(this.anim);
        //this.overlay.removeChild(this.finalSprite);
        this.finalSprite.visible = false;
    }
}

class Transition{
    constructor(textureIn, textureOut, x = 0, y = 0, speed, scale, inScene, outScene, type){
        if(!sceneManager.animationsEnabled){
            console.log("transitioning");     
            outScene.transitionTo();
            inScene.transitionAway();
            sceneManager.enableButtons();      

            if(type == "scene")
                sceneManager.continueScene();
            else
                sceneManager.continueOverlay();   
            return;
        }
        this.out = new TransitionOut(textureOut, speed, scale, outScene);
        this.in = new TransitionAnim(textureIn, speed, scale, inScene, outScene, this.out, type);
        inScene.addChild(this.in);
        this.in.play();
        
        audioManager.playSFX(sceneManager.transitionSFX);
        //console.log("playiong first half");
    }
}

class TransitionAnim extends PIXI.AnimatedSprite{
    constructor(texture, speed, scale, inScene, outScene, transOut, type){
        super(texture);

        this.animationSpeed = speed;
        this.scale.set(scale);
        this.loop = false;
        this.onComplete = e => {
            inScene.removeChild(this);
            //console.log("finished transition IN");
            outScene.transitionTo();
            outScene.addChild(transOut);
            transOut.play();

            //When screen is covered, remove the previous animated ui
            inScene.transitionAway();
            if(type == "scene")
                sceneManager.continueScene();
            else
                sceneManager.continueOverlay();

            //console.log("transitioning away");
        }         
    }    
}

// class TransitionOverlay extends PIXI.AnimatedSprite{
//     constructor(texture, speed, scale, inScene, outScene, transOut){
//         super(texture);

//         this.animationSpeed = speed;
//         this.scale.set(scale);
//         this.loop = false;
//         this.onComplete = e => {
//             inScene.removeChild(this);
//             //console.log("finished transition IN");
//             outScene.transitionTo();
//             outScene.addChild(transOut);
//             transOut.play();

//             inScene.transitionAway();
//             sceneManager.continueOverlay();

//             //console.log("transitioning away");
//         }         
//     }    
// }

// class TransitionScene extends PIXI.AnimatedSprite{
//     constructor(texture, speed, scale, inScene, outScene, transOut){
//         super(texture);

//         this.animationSpeed = speed;
//         this.scale.set(scale);
//         this.loop = false;
//         this.onComplete = e => {
//             inScene.removeChild(this);
//             //console.log("finished transition IN");
//             outScene.transitionTo();
//             outScene.addChild(transOut);
//             transOut.play();

//             inScene.transitionAway();
//             sceneManager.continueScene();
//         }         
//     }    
// }

class TransitionOut extends PIXI.AnimatedSprite{
    constructor(texture, speed, scale, scene){
        super(texture);
        this.scene = scene;

        this.animationSpeed = speed;
        this.scale.set(scale);
        this.loop = false;
        this.onComplete = e => {
            scene.removeChild(this);
            //console.log("finished transition OUT");   
            sceneManager.enableButtons();      
            
            sceneManager.transitioning = false;
        } 
    }
}




//======================================================================================
class Explosion extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, speed, scale, scene = gameScene){
        super(texture);
        this.x = x;
        this.y = y;
        this.scene = scene;

        this.animationSpeed = speed/3;
        this.scale.set(scale);
        this.anchor.set(0.5,0.5);
        this.loop = false;
        this.onComplete = e => {
            this.scene.removeChild(this);
            //console.log("explosion removed!");
        };
        this.play();
    }
}

class Trail{
    constructor(texture, x = 0, y = 0, history = 5, scale = 1, rope = 50){
        //this.trailTexture = texture;
        this.historyX = [];
        this.historyY = [];
        //How long trail wil be
        this.historySize = history;
        //How smooth trail will be
        this.ropeSize = rope;
        this.points = [];

        // Create history array.
        for (let i = 0; i < this.historySize; i++) {
            this.historyX.push(x/this.scale);
            this.historyY.push(y/this.scale);
        }
        // Create rope points.
        for (let i = 0; i < this.ropeSize; i++) {
            this.points.push(new PIXI.Point(x, y));
        }

        // Create the rope
        this.scale = scale;
        this.rope = new PIXI.SimpleRope(texture, this.points);
        this.rope.scale.set(this.scale);

        // Set the blendmode
        this.rope.blendmode = PIXI.BLEND_MODES.ADD;

        //app.stage.addChild(rope);
    }

    resetPoints(posX, posY){
        // Create history array.
        for (let i = 0; i < this.historySize; i++) {
            this.historyX[i] = posX;
            this.historyY[i] = posY;
        }
        // Create rope points.
        for (let i = 0; i < this.ropeSize; i++) {
            this.points[i].x = posX;
            this.points[i].y = posY;
        }

    }

    updatePoints(posX = mousePosition.x, posY = mousePosition.y, smooth = false){
        // Update the mouse values to history
        this.historyX.pop();
        this.historyX.unshift(posX);
        this.historyY.pop();
        this.historyY.unshift(posY);
        // Update the points to correspond with history.
        for (let i = 0; i < this.ropeSize; i++) {
            let p = this.points[i];

            if(smooth){
                // Smooth the curve with cubic interpolation to prevent sharp edges.
                let ix = cubicInterpolation(this.historyX, i / this.ropeSize * this.historySize);
                let iy = cubicInterpolation(this.historyY, i / this.ropeSize * this.historySize);

                p.x = ix/this.scale;
                p.y = iy/this.scale;
            }
            else{
                p.x = this.historyX[i]/this.scale;
                p.y = this.historyY[i]/this.scale;
            }
            
        }
    }
}

class Particle{
    constructor(){
        this.particle = fx.getParticleEmitter('paint');
        def.x = 900;
        def.y = 600;
        def.init(mainMenuScene, true, 1);
    }
}

class Track extends PIXI.AnimatedSprite{
    constructor(texture, x = 0, y = 0, r, speed, tSpeed){
        super(texture);
        this.anchor.set(0.5,0.5);
        this.x = x;
        this.y = y;
        this.rotation = r;

        this.animationSpeed = speed;
        this.loop = false;
        this.onComplete = e => gameScene.removeChild(this);
        this.play();

        this.transparentSpeed = tSpeed;
    }

    updateTransparency(){
        if(this.alpha == 0){
            gameScene.removeChild(this);
        }
    }
}