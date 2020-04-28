class SplashScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: SPLASH,
            pack: {
                files: [
                    {
                        type: "image",
                        key: "splashScreen",
                        url: "assets/splashbackground.png"
                    }
                ]
            }
        });
    }

    preload() {
        this.add.image(0, 0, "splashScreen").setOrigin(0);

        var loadingBox = this.add.graphics();
        var loadingBar = this.add.graphics();
        loadingBox.fillStyle(0xffffff); // white
        loadingBox.fillRect(WIDTH/2 - (WIDTH/4), HEIGHT - 100, WIDTH/2, 30);
        loadingBar.fillStyle(0x00b300);

        // background
        this.load.image("menuBG", "assets/splashbackground.png");
        this.load.image("aboutBG", "assets/aboutbackground.png");
        this.load.image("pauseBG", "assets/pausebackground.png");
        this.load.image("controlsBG", "assets/controlsbackground.png");
        this.load.image("levelSelectBG", "assets/levelselectbackground.png");

        // buttons
        this.load.image("backbutton", "assets/backbutton.png");
        this.load.image("unmutebutton", "assets/unmute.png");
        this.load.image("mutebutton", "assets/mute.png");
        this.load.image("playbutton", "assets/playbutton.png");
        this.load.image("aboutbutton", "assets/aboutbutton.png");
        this.load.image("controlsbutton", "assets/controlsbutton.png");
        this.load.image("exitbutton", "assets/exitbutton.png");
        this.load.image("restartbutton", "assets/restartbutton.png");
        this.load.image("resumebutton", "assets/resumebutton.png");
        this.load.image("levelonebutton", "assets/levelonebutton.png");
        this.load.image("leveltwobutton", "assets/leveltwobutton.png");
        this.load.image("levelthreebutton", "assets/levelthreebutton.png");
        this.load.image("levelfourbutton", "assets/levelfourbutton.png");
        this.load.image("levelfivebutton", "assets/levelfivebutton.png");
        this.load.image("levelsixbutton", "assets/levelsixbutton.png");


        // tilemaps
        this.load.image("tileset", "assets/tileset.png");
        this.load.tilemapTiledJSON("levelOne", "assets/tilemaps/intro1.json");

        //player
        this.load.spritesheet("pillboy", "assets/pill.png", {frameHeight: 32, frameWidth: 32});
        
        this.load.on("progress", (percentage) => {
            loadingBar.fillRect(WIDTH/2 - (WIDTH/4), HEIGHT - 100, WIDTH/2 * percentage, 30);
        });

        this.load.on("complete", () => {
            loadingBox.destroy();
            loadingBar.destroy();
            let data = {
                "unlockedLevels" : [1, 0, 0, 0, 0, 0]
            }
            this.scene.start(MENU, data);
        });
    }
}