class PauseScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : PAUSE
        })
    }

    create() {
        this.add.image(0, 0, "pauseBG").setOrigin(0);
        var resumeButton = this.add.image(WIDTH/2, 350, "resumebutton");
        var restartButton = this.add.image(WIDTH/2, 350, "restartbutton");
        var controlsbutton = this.add.image(WIDTH/2, 350, "controlsbutton");
        var exitButton = this.add.image(WIDTH/2, 350, "exitbutton");

        resumeButton.setInteractive();
        resumeButton.on("pointerover", () => {
            resumeButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        playButton.on("pointerout", () => {
            playButton.setScale(BUTTON_SCALE);
        })
        playButton.on("pointerup", () => {
            this.scene.start(LEVEL_SELECT);
        })
    }
}