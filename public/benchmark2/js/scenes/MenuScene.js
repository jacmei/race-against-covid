class MenuScene extends Phaser.Scene {
    
    constructor() {
        super({
            key : MENU
        })
    }

    create() {
        this.add.image(0, 0, "menuBG").setOrigin(0);
    }
}