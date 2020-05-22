class LevelSixScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_SIX
        });
        this.key = LEVEL_SIX;
        this.timeLeft = 240;
    }

    create() {
        super.loadMap('levelSix');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
    }

    update() {
        super.update();
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}