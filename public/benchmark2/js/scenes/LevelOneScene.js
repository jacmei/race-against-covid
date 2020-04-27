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

        this.player = this.physics.add.sprite(this.rooms[0].x + WIDTH/2, this.rooms[0].y + HEIGHT/2, "pillboy", 26).setScale(2);
        this.physics.add.collider(this.player, this.collisionLayer);
        this.player.setCollideWorldBounds(true);
        this.collisionLayer.setCollisionByProperty({collides:true}); // suppose to scan for tiles with collides property set to true and actually make them collidable
    }

    update(time, delta) {
        if (this.input.keyboard.addKey("D").isDown === true) {
            this.player.x = this.player.x + 200 * (delta / 1000);
        }

        if (this.input.keyboard.addKey("S").isDown === true) {
            this.player.y = this.player.y + 200 * (delta / 1000);
        }

        if (this.input.keyboard.addKey("A").isDown === true) {
            this.player.x = this.player.x - 200 * (delta / 1000);
        }

        if (this.input.keyboard.addKey("W").isDown === true) {
            this.player.y = this.player.y - 200 * (delta / 1000);
        }
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