class WinScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : WIN
        })
    }

    create() {
        this.add.image(0, 0, "winBG").setOrigin(0);
        // var resumeButton = this.add.image(WIDTH/2, 200, "resumebutton");
        var restartButton = this.add.image(WIDTH/2, 300, "restartbutton");
        // var controlsButton = this.add.image(WIDTH/2, 400, "controlsbutton");
        var exitButton = this.add.image(WIDTH/2, 500, "exitbutton");

        exitButton.setInteractive();
        exitButton.on("pointerover", () => {
            exitButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        exitButton.on("pointerout", () => {
            exitButton.setScale(BUTTON_SCALE);
        })
        exitButton.on("pointerup", () => {
            this.pausedScene.reset();
            this.pausedScene.scene.stop();
            this.scene.start(MENU);
        })

        restartButton.setInteractive();
        restartButton.on("pointerover", () => {
            restartButton.setScale(BUTTON_SCALE_ENLARGE);
        })
        restartButton.on("pointerout", () => {
            restartButton.setScale(BUTTON_SCALE);
        })
        restartButton.on("pointerup", () => {
            this.pausedScene.reset();
            this.pausedScene.scene.stop();
            this.scene.start(this.pausedScene);
        })
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.stop();
            this.scene.resume(this.pausedScene);
        }
    }
}