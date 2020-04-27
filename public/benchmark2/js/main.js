var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [SplashScene, MenuScene, ControlScene, AboutScene, LevelScene, PauseScene, LevelOneScene]
};

var game = new Phaser.Game(config);