// class UIText extends PIXI.Text{
//     constructor(text, fill, fontSize, fontFamily, x = 0, y = 0){
//         super(text);
//         this.style = new PIXI.TextStyle({
//             fill: fill,
//             fontSize: fontSize,
//             fontFamily: fontFamily
//         });
//         this.x = x;
//         this.y = y;
//     }
// }

class Label extends PIXI.Sprite{
    constructor(texture, x, y){
        super(texture);
        this.x = x;
        this.y = y;
        //console.log(this.visible);
        //this.visible = true;
    }
}

class IconLoader{
    constructor(){
        this.icons = [];

        //SIZES = WIDTH, HEIGHT, GAP BETWEEN
        this.icons["mediumheart"] = loadSprite("mediumheart.png");
        this.icons["mediumheart"]["sizes"] = [36,32,12,8];
        this.icons["smallheart"] = loadSprite("smallheart.png");
        this.icons["smallheart"]["sizes"] = [28,24,8,8];
        this.icons["blankheart"] = loadSprite("blankheart.png");
        this.icons["blankheart"]["sizes"] = [28,24,8,8];

        this.icons["filledbasic"] = loadSprite("filledbasic.png");
        this.icons["filledbasic"]["sizes"] = [28,16,8,25];
        this.icons["filledrocket"] = loadSprite("filledrocket.png");
        this.icons["filledrocket"]["sizes"] = [32,20,8,25];
        this.icons["filledrubber"] = loadSprite("filledrubber.png");
        this.icons["filledrubber"]["sizes"] = [20,20,8,25];
        this.icons["blankbasic"] = loadSprite("blankbasic.png");
        this.icons["blankbasic"]["sizes"] = [28,16,8,25];
        this.icons["blankrocket"] = loadSprite("blankrocket.png");
        this.icons["blankrocket"]["sizes"] = [32,20,8,25];
        this.icons["blankrubber"] = loadSprite("blankrubber.png");
        this.icons["blankrubber"]["sizes"] = [20,20,8,25];

        this.icons["2s"] = loadSprite("2s.png");
        this.icons["2s"]["sizes"] = [92,24,4,2];
        this.icons["3s"] = loadSprite("3s.png");
        this.icons["3s"]["sizes"] = [60,24,4,3];
        this.icons["4s"] = loadSprite("4s.png");
        this.icons["4s"]["sizes"] = [44,24,4,4];
        this.icons["5s"] = loadSprite("5s.png");
        this.icons["5s"]["sizes"] = [36,24,4,5];
        this.icons["12s"] = loadSprite("12s.png");
        this.icons["12s"]["sizes"] = [12,24,4,12];
        this.icons["24s"] = loadSprite("24s.png");
        this.icons["24s"]["sizes"] = [4,24,4,24];

        this.icons["locked"] = loadSprite("locked.png");
        this.icons["locked"]["sizes"] = [28,24,8,1];

        this.icons["2lock"] = loadSprite("2lock.png");
        this.icons["2lock"]["sizes"] = [200,24,4,1];
        this.icons["3lock"] = loadSprite("3lock.png");
        this.icons["3lock"]["sizes"] = [200,24,4,1];
        this.icons["4lock"] = loadSprite("4lock.png");
        this.icons["4lock"]["sizes"] = [200,24,4,1];
        this.icons["5lock"] = loadSprite("5lock.png");
        this.icons["5lock"]["sizes"] = [200,24,4,1];
        this.icons["12lock"] = loadSprite("12lock.png");
        this.icons["12lock"]["sizes"] = [200,24,4,1];
        this.icons["24lock"] = loadSprite("24lock.png");
        this.icons["24lock"]["sizes"] = [200,24,4,1];

        this.icons["end"] = loadSprite("upgradeEnd.png");
        this.icons["end"]["sizes"] = [28,24,8,1];

        this.icons["cost"] = loadSprite("cost.png");
        this.icons["cost"]["sizes"] = [160,28,8,1];

        this.icons["maxrank"] = loadSprite("maxrank.png");
        this.icons["maxrank"]["sizes"] = [160,28,8,1];
    }
}

class Icon{
    constructor(xOrigin = 0, yOrigin = 0, icon, number, scene){
        this.currentIcon = iconLoader.icons[icon];
        this.width = this.currentIcon["sizes"][0];
        this.height = this.currentIcon["sizes"][1];
        this.gap = this.currentIcon["sizes"][2];
        this.max = this.currentIcon["sizes"][3];
        this.number = number;
        this.active = true;
        this.removed = false;

        this.scene = scene;

        this.icons = [];
        
        this.x = xOrigin;
        this.y = yOrigin;

        let tempX = this.x;
        for(let i = 0; i < this.max; i++){
            let iconSprite = new PIXI.Sprite(this.currentIcon);
            iconSprite.x = tempX;
            iconSprite.y = this.y;
            if(i >= this.number)
                iconSprite.visible = false;
            this.scene.addChild(iconSprite);
            this.icons.push(iconSprite);
            tempX += this.width + this.gap;  
        }
    }

    updateNumber(number){
        if(this.removed)
            return;
        if(number <= this.max)
            this.number = number;
        for(let sprite of this.icons){
            sprite.visible = false;
        }
        if(this.active){
            for(let i = 0; i < this.number; i++){
                this.icons[i].visible = true;
            }        
        }
    }

    updateIcon(icon, number){
        if(this.removed)
            return;
        this.currentIcon = iconLoader.icons[icon];
        if(this.active){
            this.icons[number].texture = this.currentIcon;
            // for(let sprite of this.icons){
            //     sprite.texture = this.currentIcon;
            // }      
        }
    }

    makeVisible(){
        if(this.removed)
            return;
        if(!this.active)
            return;
        for(let sprite of this.icons){
            sprite.visible = false;
        }
        for(let i = 0; i < this.number; i++){
            this.icons[i].visible = true;
        }     
    }

    makeInvisible(){
        if(this.removed)
            return;
        for(let sprite of this.icons){
            sprite.visible = false;
        }
    }

    addToScene(scene = this.scene){
        if(this.removed)
            return;
        for(let sprite of this.icons){
            scene.addChild(sprite);
        }
    }

    removeFromScene(scene = this.scene){
        this.removed = true;
        for(let sprite of this.icons){
            scene.removeChild(sprite);
        }
    }
}

class FontLoader{
    constructor(){
        this.fonts = [];
        // SIZES = WIDTH, HEIGHT, GAP BETWEEN, SPACE
        this.fonts["tinynumber"] = loadSpriteSheet("tinynumbers.png", 0, 16, 24, 10);
        this.fonts["tinynumber"]["sizes"] = [12, 24, 4, 8];

        this.fonts["smallnumber"] = loadSpriteSheet("smallnum.png", 0, 20, 24, 10);
        this.fonts["smallnumber"]["sizes"] = [16, 24, 4, 8];

        this.fonts["mediumnumber"] = loadSpriteSheet("mediumnumber.png", 0, 32, 44, 10);
        this.fonts["mediumnumber"]["sizes"] = [24, 44, 8, 8];

        this.fonts["statsnumber"] = loadSpriteSheet("statsnumber.png", 0, 20, 36, 11);
        this.fonts["statsnumber"]["sizes"] = [20, 28, 4, 8];

        this.fonts["timernumber"] = loadSpriteSheet("timernumber.png", 0, 28, 48, 11);
        this.fonts["timernumber"]["sizes"] = [28, 48, 8, -4];

        this.fonts["graynumber"] = loadSpriteSheet("graynumber.png", 0, 20, 28, 10);
        this.fonts["graynumber"]["sizes"] = [20, 28, 8, 8];
        

        this.fonts["small"] = [];
        this.fonts["small"] = this.fonts["small"].concat(loadSpriteSheet("smallfont.png", 0, 24, 28, 6)); 
        this.fonts["small"] = this.fonts["small"].concat(loadSpriteSheet("smallfont.png", 1, 24, 28, 6)); 
        this.fonts["small"] = this.fonts["small"].concat(loadSpriteSheet("smallfont.png", 2, 24, 28, 6)); 
        this.fonts["small"] = this.fonts["small"].concat(loadSpriteSheet("smallfont.png", 3, 24, 28, 6)); 
        this.fonts["small"] = this.fonts["small"].concat(loadSpriteSheet("smallfont.png", 4, 24, 28, 6)); 
        this.fonts["small"]["sizes"] = [20, 24, 4, 8];

        this.fonts["medium"] = [];
        this.fonts["medium"] = this.fonts["medium"].concat(loadSpriteSheet("mediumfont.png", 0, 32, 52, 6)); 
        this.fonts["medium"] = this.fonts["medium"].concat(loadSpriteSheet("mediumfont.png", 1, 32, 52, 6)); 
        this.fonts["medium"] = this.fonts["medium"].concat(loadSpriteSheet("mediumfont.png", 2, 32, 52, 6)); 
        this.fonts["medium"] = this.fonts["medium"].concat(loadSpriteSheet("mediumfont.png", 3, 32, 52, 6)); 
        this.fonts["medium"] = this.fonts["medium"].concat(loadSpriteSheet("mediumfont.png", 4, 32, 52, 6)); 
        this.fonts["medium"]["sizes"] = [24, 44, 4, 8];

        this.fonts["large"] = [];
        this.fonts["large"] = this.fonts["large"].concat(loadSpriteSheet("largefont.png", 0, 40, 56, 6)); 
        this.fonts["large"] = this.fonts["large"].concat(loadSpriteSheet("largefont.png", 1, 40, 56, 6)); 
        this.fonts["large"] = this.fonts["large"].concat(loadSpriteSheet("largefont.png", 2, 40, 56, 6)); 
        this.fonts["large"] = this.fonts["large"].concat(loadSpriteSheet("largefont.png", 3, 40, 56, 6)); 
        this.fonts["large"] = this.fonts["large"].concat(loadSpriteSheet("largefont.png", 4, 40, 56, 6)); 
        this.fonts["large"]["sizes"] = [32, 48, 8, 12];

        this.fonts["button"] = [];
        this.fonts["button"] = this.fonts["button"].concat(loadSpriteSheet("buttonfont.png", 0, 56, 72, 6)); 
        this.fonts["button"] = this.fonts["button"].concat(loadSpriteSheet("buttonfont.png", 1, 56, 72, 6)); 
        this.fonts["button"] = this.fonts["button"].concat(loadSpriteSheet("buttonfont.png", 2, 56, 72, 6)); 
        this.fonts["button"] = this.fonts["button"].concat(loadSpriteSheet("buttonfont.png", 3, 56, 72, 6)); 
        this.fonts["button"] = this.fonts["button"].concat(loadSpriteSheet("buttonfont.png", 4, 56, 72, 6)); 
        this.fonts["button"]["sizes"] = [48, 64, 8, 12];
    }
}

class UIText{
    constructor(xOrigin = 0, yOrigin = 0, font, string, stage){
        this.scene = stage;
        this.fontName = font;
        this.currentFont = fontManager.fonts[font];
        this.width = this.currentFont["sizes"][0];
        this.height = this.currentFont["sizes"][1];
        this.gap = this.currentFont["sizes"][2];
        this.space = this.currentFont["sizes"][3];
        this.lowerCase = (this.currentFont.length > 30);
        this.textSprites = [];
        let xIndex = 0;
        this.x = xOrigin;
        this.y = yOrigin;

        let tempX = this.x;

        let grayZero = (font == "timernumber" || font == "statsnumber");
        for(let i = 0; i < string.length; i++){
            let charIndex;
            let c = string.charCodeAt(i);
            switch(c){
                case 32:
                    tempX = (tempX - this.width) + this.space;
                    break;
                case 33:
                    charIndex = 29;
                    break;
                case 44:
                    charIndex = 27;
                    break;
                case 46:
                    charIndex = 26;
                    break;
                case 39:
                    charIndex = 28;
                    break;
            }
            //Numbers
            if(c >= 48 && c <= 57){
                charIndex = c-48;
                if(c != 48)
                    grayZero = false;
                if(grayZero){
                    charIndex = 10;
                }
            }
            //Upercase
            if(c >= 65 && c <= 91){
                charIndex = c-65;
            }
            //Lowercase
            if(c >=97 && c <= 122){
                if(this.lowerCase)
                    charIndex = c - 66;
                else
                    charIndex = c - 97;
            }            
            //console.log(c);
            let charSprite = new PIXI.Sprite(this.currentFont[charIndex]);
            charSprite.x = tempX;
            charSprite.y = this.y;
            this.textSprites.push(charSprite);
            stage.addChild(charSprite);
            xIndex++;

            tempX += this.width + this.gap;
            //y += this.height;            
        }        
    }

    updateText(string){
        this.removeFromScene();
        this.textSprites = [];
        let xIndex = 0;

        let tempX = this.x;
        let grayZero = (this.fontName == "timernumber" || this.fontName == "statsnumber");
        for(let i = 0; i < string.length; i++){
            let charIndex;
            let c = string.charCodeAt(i);
            switch(c){
                case 32:
                    tempX = (tempX - this.width) + this.space;
                    break;
                case 33:
                    charIndex = 29;
                    break;
                case 44:
                    charIndex = 27;
                    break;
                case 46:
                    charIndex = 26;
                    break;
                case 39:
                    charIndex = 28;
                    break;
            }
            if(c >= 48 && c <= 57){
                charIndex = c-48;
                if(c != 48)
                    grayZero = false;
                if(grayZero){
                    charIndex = 10;
                }
            }
            if(c >= 65 && c <= 91){
                charIndex = c-65;
            }
            if(c >=97 && c <= 122){
                if(this.lowerCase)
                    charIndex = c - 66;
                else
                    charIndex = c - 97;
            }            
            //console.log(c);
            let charSprite = new PIXI.Sprite(this.currentFont[charIndex]);
            charSprite.x = tempX;
            charSprite.y = this.y;
            this.textSprites.push(charSprite);
            this.scene.addChild(charSprite);
            xIndex++;

            tempX += this.width + this.gap;
            //y += this.height;            
        }
    }

    makeVisible(){
        for(let sprite of this.textSprites){
            sprite.visible = true;
        }
    }

    makeInvisible(){
        for(let sprite of this.textSprites){
            sprite.visible = false;
        }
    }

    addToScene(scene = this.scene){
        for(let sprite of this.textSprites){
            scene.addChild(sprite);
        }
    }

    removeFromScene(scene = this.scene){
        for(let sprite of this.textSprites){
            scene.removeChild(sprite);
        }
    }
}


class Button extends PIXI.Sprite{
    constructor(textures, x = 0, y = 0, clickedFunction){
        super(textures[0]);
        this.buttonDefault = textures[0];
        this.buttonOver = textures[1];
        this.buttonDown = textures[2];

        this.x = x;
        this.y = y;

        this.interactive = true;
        
        this.invalid = false;

        //this.buttonMode = true;

        this.isDown = false;
        this.isOver = false;
        this
            .on('pointerdown', this.onButtonDown)
            .on('pointerup', clickedFunction)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);

        this.overSFX = audioManager.sfx["button"]["over"];
        this.clickSFX = audioManager.sfx["button"]["click"];

        this.invalidClickSFX = audioManager.sfx["button"]["invalid"];
    }

    onButtonDown() {
        this.isDown = true;
        this.texture = this.buttonDown;
        //console.log("button down");
        //console.log(this.invalid);
        if(this.invalid){
            audioManager.playSFX(this.invalidClickSFX);  
        }            
        else  
            audioManager.playSFX(this.clickSFX);
    }
    
    onButtonUp() {
        this.isDown = false;
        if (this.isOver) {
            this.texture = this.buttonOver;
        } else {
            this.texture = this.buttonDefault;
        }
        //console.log("button up");
    }
    
    onButtonOver() {
        this.isOver = true;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonOver;
        audioManager.playSFX(this.overSFX);
    }
    
    onButtonOut() {
        this.isOver = false;
        if (this.isdown) {
            return;
        }
        this.texture = this.buttonDefault;
    }
}