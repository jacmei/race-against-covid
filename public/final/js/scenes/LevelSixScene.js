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

        let boss = new BossVirus(this, this.rooms[this.rooms.length-1].x+WIDTH/2, this.rooms[this.rooms.length-1].y+200, BOSS);
        // Uncomment to this test boss mechanics in first room instead of playing to last room
        //let boss = new BossVirus(this, this.rooms[0].x+WIDTH/2, this.rooms[0].y+100, BOSS);
        //boss.canMove = true;
        this.addVirus(boss);
    }

    update() {
        super.update();
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}