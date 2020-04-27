class LevelOneScene extends Phaser.Scene {

    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.player = null;
        this.rooms = [];
        this.floor = null;
        this.collisionLayer = null;
        this.doors = null;
        this.tier = TIER_ONE;
    }

    create() {
        var map = this.add.tilemap("levelOne");

        var tileset = map.addTilesetImage("tileset");
        this.floor = map.createStaticLayer("floor", tileset, 0, 0);
        this.collisionLayer = map.createStaticLayer("collidable", tileset, 0, 0);
        this.doors = map.createStaticLayer("doors", tileset, 0, 0);

        //create list of rooms
        map.findObject('Objects', function(object) {
            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }
        }, this);

        //move camera to specific room
        this.cameras.main.setBounds(this.rooms[0].x,
            this.rooms[0].y,
            this.rooms[0].width,
            this.rooms[0].height,
            true
        );

        this.player = new PillBoy(this, this.rooms[0].x + WIDTH/2, this.rooms[0].y + HEIGHT/2);
    }

    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.launch(PAUSE);
            var pauseScene = this.scene.get(PAUSE);
            pauseScene.pausedScene = LEVEL_ONE;
            this.scene.pause();
            this.scene.bringToTop(PAUSE);
        }

        if (this.input.activePointer.isDown) {
            // TODO
            this.player.play("attack_left_tier_one", true);
            console.log("Pointer X: " + this.input.activePointer.x + " | Pointer Y: " + this.input.activePointer.y);
        }

        this.player.update();

        if (this.input.keyboard.addKey('ONE').isDown === true) {
            this.cameras.main.setBounds(this.rooms[0].x,
            this.rooms[0].y,
            this.rooms[0].width,
            this.rooms[0].height,
            true);
        }
        if (this.input.keyboard.addKey('TWO').isDown === true) {
            this.cameras.main.setBounds(this.rooms[1].x,
            this.rooms[1].y,
            this.rooms[1].width,
            this.rooms[1].height,
            true);
        }
        if (this.input.keyboard.addKey('THREE').isDown === true) {
            this.cameras.main.setBounds(this.rooms[2].x,
            this.rooms[2].y,
            this.rooms[2].width,
            this.rooms[2].height,
            true);
        }
    }
}