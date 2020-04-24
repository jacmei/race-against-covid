class SplashScene extends Phaser.Scene {
    
    constructor() {
        super({
            key: SPLASH,
            pack: {
                files: [
                    {
                        type: "image",
                        key: "splashScreen",
                        url: "images/splash.png"
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
        loadingBar.fillStyle(0x00ff00);

        // LOAD ALL IMAGES NEEDED
        
        // FILLER FOR NOW (TO SEE IF LOADING BAR WORKS) UNTIL WE GET ALL IMAGES
        this.load.image("menuBG", "images/mainscreen.png");
        this.load.image("controlsBG", "images/controls.png");
        this.load.image("helpBG", "images/help.png");
        this.load.image("levelSelectBG", "images/levelselect.png");
        this.load.image("pauseBG", "images/pause.png");
        
        this.load.on("progress", (percentage) => {
            console.log(percentage);
            loadingBar.fillRect(WIDTH/2 - (WIDTH/4), HEIGHT - 100, WIDTH/2 * percentage, 30);
        });

        this.load.on("complete", () => {
            loadingBox.destroy();
            loadingBar.destroy();
            this.scene.start(MENU);
        });
    }
}