class AudioManager{
    constructor(){
        this.bgm = [];
        this.sfx = [];

        this.gameMusic = [];

        this.currentSong;
        this.musicOn = true;
        this.sfxOn = true;

        this.setupMusic();
        this.setupSFX();
    }

    setupMusic(){
        //console.log("settinguop usic");
        //"assets/audio/"
        this.bgm["mainmenu"] = [
            loadSound('music/mainmenu/PGRL - Track 10 - Layer 01.wav', .2, true),
            loadSound('music/mainmenu/PGRL - Track 10 - Layer 02.wav', .2, true),
            loadSound('music/mainmenu/PGRL - Track 10 - Layer 03.wav', .2, true),
            loadSound('music/mainmenu/PGRL - Track 10 - Layer 04.wav', .2, true),
            loadSound('music/mainmenu/PGRL - Track 10 - Layer 05.wav', .2, true)
        ];
        //this.bgm["mainmenu"]["base"] = loadSound('music/mainmenu/PGRL - Track 10 - Fill.wav', .2, true);
        this.bgm["mainmenu"]["white"] = loadSound('music/mainmenu/PGRL - Track 10 - Layer 01.wav', .3, true);
        this.bgm["mainmenu"]["blue"] = loadSound('music/mainmenu/PGRL - Track 10 - Layer 02.wav', .3, true);
        this.bgm["mainmenu"]["red"] = loadSound('music/mainmenu/PGRL - Track 10 - Layer 03.wav', .3, true);
        this.bgm["mainmenu"]["green"] = loadSound('music/mainmenu/PGRL - Track 10 - Layer 04.wav', .3, true);
        this.bgm["mainmenu"]["purple"] = loadSound('music/mainmenu/PGRL - Track 10 - Layer 05.wav', .3, true);
               
        this.bgm["pause"] = loadSound('music/menu/LD30 - Track 6.wav', .2, true);
        this.bgm["upgrades"] = loadSound('music/menu/ASafeHaven.mp3', .2, true);
        this.bgm["fail"] = loadSound('music/menu/NightTime.mp3', .2, true);
        //this.bgm["clear"] = loadSound('music/menu/ASafeHaven.mp3', .2, true);
        this.bgm["clear"] = loadSound('music/menu/PGRL - Track 3.wav', .2, true);

        //this.bgm["game"] = [];
        this.gameMusic["white"] = loadSound('music/game/LD38 - Track 2.wav', .15, true);
        this.gameMusic["blue"] = loadSound('music/game/MissionBriefing.mp3', .15, true);
        this.gameMusic["red"] = loadSound('music/game/RoadsOfRage.mp3', .16, true);
        this.gameMusic["green"] = loadSound('music/game/WMNAH.mp3', .14, true);        
        this.gameMusic["purple"] = loadSound('music/game/YetAnotherJourney.mp3', .2, true);

        // this.bgm["main"] = loadSound('music/bgm.wav', .2, true);
        // this.bgm["options"] = loadSound('shot.wav', .2, false);
        // this.bgm["game"] = loadSound('longexpl.wav', .2, true);

        //this.bgm["main"].play();

        this.currentSong = this.bgm["mainmenu"]["white"];
        this.currentSong.play();
    }

    setupSFX(){
        //console.log("settinguop sfx");
        //this.sfx["transition"] = loadSound('sfx/abs-cancel-5.mp3', .2);
        this.sfx["transitionIn"] = loadSound('sfx/misc-bassdrop.wav', .05);
        this.sfx["transitionOut"] = loadSound('sfx/misc-bassdrop.wav', .05);

        this.sfx["button"] = [];
        this.sfx["button"]["over"] = loadSound('sfx/button/Modern2.wav', .5);
        this.sfx["button"]["click"] = loadSound('sfx/button/back-style-2.wav', .65);
        
        this.sfx["button"]["bigClick"] = loadSound('sfx/button/back-style-3.wav', 1);
        this.sfx["button"]["bigClick2"] = loadSound('sfx/button/Retro8.wav', .9);

        this.sfx["button"]["smallBackClick"] = loadSound('sfx/button/Modern3.wav', 1);
        this.sfx["button"]["mediumBackClick"] = loadSound('sfx/button/error-style-2.wav', .6);

        this.sfx["button"]["quitClick"] = loadSound('sfx/button/Menu Back.mp3', .7);

        //this.sfx["button"]["invalid"] = loadSound('sfx/Modern3.wav', 1);
        this.sfx["button"]["smallUpgrade"] = loadSound('sfx/button/powerup3 - sep2.flac', .25);
        this.sfx["button"]["bigUpgrade"] = loadSound('sfx/button/powerup4 - sep2.flac', .135);
        this.sfx["button"]["heal"] = loadSound('sfx/button/powerup3 - sep2.flac', .25);
        this.sfx["button"]["fullHeal"] = loadSound('sfx/button/powerup2 - sep2.flac', .15);
        this.sfx["button"]["maxHealth"] = loadSound('sfx/button/powerup2 - sep2.flac', .15);
        //this.sfx["button"]["invalid"] = loadSound('sfx/Menu Select 2.mp3', .5);
        this.sfx["button"]["invalid"] = loadSound('sfx/button/Error 1.mp3', .6);


        //Tank sounds ================================================================
        this.sfx["tanks"] = [];
        //this.sfx["tanks"]["basicShoot"] = loadSound('sfx/tanks/hit6.flac', .4);

        this.sfx["tanks"]["death"] = loadSound('sfx/tanks/explosion4.flac', .4);
        this.sfx["tanks"]["treads"] = loadSound('sfx/tanks/Rutters.mp3', .9, true);

        this.sfx["tanks"]["basicShoot"] = loadSound('sfx/tanks/Death Sound 4.mp3', .7);
        this.sfx["tanks"]["basicBounce"] = loadSound('sfx/tanks/hit8.flac', .3);
        this.sfx["tanks"]["basicDeath"] = loadSound('sfx/tanks/explosion8.flac', .7);        

        this.sfx["tanks"]["rocketShoot"] = loadSound('sfx/tanks/explosion5.flac', .17);
        this.sfx["tanks"]["rocketDeath"] = loadSound('sfx/tanks/explosion9.flac', .4);

        this.sfx["tanks"]["rubberShortBounce"] = loadSound('sfx/tanks/jump9.mp3', .5);
        this.sfx["tanks"]["rubberLongBounce"] = loadSound('sfx/tanks/jump4.mp3', .6);        
        this.sfx["tanks"]["rubberDeath"] = loadSound('sfx/tanks/teleport2.flac', .3);

        //Enemy sfx, always a bit quieter than player
        this.sfx["tanks"]["eBasicShoot"] = loadSound('sfx/tanks/hit2.flac', .17);
        this.sfx["tanks"]["eBasicBounce"] = loadSound('sfx/tanks/hit6.flac', .15);
        this.sfx["tanks"]["eBasicDeath"] = loadSound('sfx/tanks/explosion8.flac', .5); 
        
        this.sfx["tanks"]["eRocketShoot"] = loadSound('sfx/tanks/explosion9.flac', .3);
        this.sfx["tanks"]["eRocketDeath"] = loadSound('sfx/tanks/explosion8.flac', .6);

        this.sfx["tanks"]["eRocketShoot+"] = loadSound('sfx/tanks/explosion9.flac', .4);
        this.sfx["tanks"]["eRocketDeath+"] = loadSound('sfx/tanks/explosion1.flac', .4);

        this.sfx["tanks"]["eRubberShortBounce"] = loadSound('sfx/tanks/jump9.mp3', .4);
        this.sfx["tanks"]["eRubberLongBounce"] = loadSound('sfx/tanks/jump4.mp3', .4);        
        this.sfx["tanks"]["eRubberDeath"] = loadSound('sfx/tanks/teleport9.flac', .12);

        
    }

    //==============
    updateMusic(newSong){
        if(newSong == this.currentSong)
            return;
        this.currentSong.pause();
        if(this.musicOn)
            newSong.play();
        this.currentSong = newSong;
    }

    updateSFX(){
    }

    playSFX(sfx){
        if(this.sfxOn)
            sfx.play();
    }

    //==============
    musicToggle(){
        //console.log("toggling mute");
        //console.log(this.musicOn);
        if(this.musicOn)
            this.currentSong.stop();
        else if(!this.musicOn)
            this.currentSong.play();
        // for(let m of this.bgm){
        //     m.mute(true);
        // }
        this.musicOn = !this.musicOn;
        //console.log(this.musicOn);
    }

    sfxToggle(){
        //console.log("toggling sfxmute");
        //console.log(this.sfxOn);
        this.sfxOn = !this.sfxOn;
        //console.log(this.sfxOn);
    }

    disableMusic(){
        for(let m of this.bgm){
            m.mute(true);
        }
        this.musicOn = false;
    }

    enableMusic(){
        for(let m of this.bgm){
            m.mute(false);
        }
        this.musicOn = true;
    }

    //==============
    disableSFX(){
        for(let s of this.sfx){
            s.mute(true);
        }
        this.sfxOn = false;
    }

    enableSFX(){
        for(let s of this.sfx){
            s.mute(false);
        }
        this.sfxOn = true;
    }
}