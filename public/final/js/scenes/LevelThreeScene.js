class LevelThreeScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_THREE
        });
        this.key = LEVEL_THREE;
        this.timeLeft = 240;
    }

    create() {
        super.loadMap('levelThree');
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