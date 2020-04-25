class AboutScene extends Phaser.Scene {
   
    constructor() {
        super({
            key : ABOUT
        })
    }

    init(data) {
        this.unlockedLevels = data.unlockedLevels;
    }

    create() {
        this.add.image(0, 0, "aboutBG").setOrigin(0);
        var backButton = this.add.image(50, 50, "backbutton").setScale(MINI_BUTTON_SCALE);
        
        backButton.setInteractive();
        backButton.on("pointerover", () => {
            backButton.setScale(MINI_BUTTON_SCALE_ENLARGE);
        })
        backButton.on("pointerout", () => {
            backButton.setScale(MINI_BUTTON_SCALE);
        })
        backButton.on("pointerup", () => {
            this.scene.start(MENU);
        })
    }

    update() {
        if (this.input.keyboard.addKey("ESC").isDown) {
            this.scene.start(MENU);
        }
    }
}