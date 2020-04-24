var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
    scene: [SplashScene, MenuScene, ControlScene, HelpScene, LevelScene, PauseScene]
};

var game = new Phaser.Game(config);