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
        this.viruses = [];
        this.timer = 0;
        this.bulletTime = 0; // DETERMINES BULLET FIRE RATE
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

        this.player = new Pill(this, this.rooms[0].x + WIDTH/2, this.rooms[0].y + HEIGHT/2);

        var min_room_width = this.rooms[0].x + 64; // 64 to avoid walls
        var max_room_width = this.rooms[0].x + WIDTH - 64;
        var min_room_height = this.rooms[0].y + 64;
        var max_room_height = this.rooms[0].y + HEIGHT - 64;
        for (let i = 0; i < 10; i++) {
            // OK NOT SPAWNING IN ROOM FOR SOME REASON
            let randomX_physical = Math.floor(Math.random() * max_room_width) + min_room_width;
            let randomY_physical = Math.floor(Math.random() * max_room_height) + min_room_height;

            let randomX_ranged = Math.floor(Math.random() * max_room_width) + min_room_width;
            let randomY_ranged = Math.floor(Math.random() * max_room_height) + min_room_height;
            var physical_virus = new Virus(this, randomX_physical, randomY_physical, PHYSICAL);
            var ranged_virus = new Virus(this, randomX_ranged, randomY_ranged, RANGED);

            this.viruses.push(physical_virus);
            this.viruses.push(ranged_virus);
        }

        //this.virusbullet = this.physics.add.sprite(this.rooms[0].x + WIDTH/2, this.rooms[0].y + HEIGHT/2, "virusbullet")

        this.viruses.forEach(virus => {
            this.physics.world.addCollider(this.player, virus, () => {
                // SOME ACTION THAT HAPPENS WHEN PLAYER COLLIDES WITH VIRUS
                virus.health = 0; // FILLER
            });
        })

        this.physics.add.collider(this.player, this.collisionLayer);
        this.collisionLayer.setCollisionByProperty({collides:true});
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            this.scene.launch(PAUSE);
            var pauseScene = this.scene.get(PAUSE);
            pauseScene.pausedScene = LEVEL_ONE;
            this.scene.pause();
            this.scene.bringToTop(PAUSE);
        }

        if (this.input.activePointer.isDown) {
            // TODO
            if (this.time.now > this.bulletTime) {
                var pillbullet = this.physics.add.sprite(this.player.body.x + this.player.width/2, this.player.body.y + this.player.height/2, "pillbullet");
                this.viruses.forEach(virus => {
                    this.physics.world.addCollider(pillbullet, virus, () => {
                        virus.health -= 1;
                        pillbullet.destroy();
                    });
                })
                // ALLOWS FOR DIAGONALS TOO
                if (this.player.body.velocity.x > 0) {
                    this.player.play("attack_right" + this.player.tier, true);
                    pillbullet.body.velocity.x = 300;
                }
                if (this.player.body.velocity.x < 0) {
                    this.player.play("attack_left" + this.player.tier, true);
                    pillbullet.body.velocity.x = -300;
                }
                if (this.player.body.velocity.y > 0) {
                    this.player.play("attack_down" + this.player.tier, true);
                    pillbullet.body.velocity.y = 300;
                }
                if (this.player.body.velocity.y < 0) {
                    this.player.play("attack_up" + this.player.tier, true);
                    pillbullet.body.velocity.y = -300;
                }
                // NEED TO FIGURE OUT WHICH DIRECTION PLAYER IS FACING IF ITS NOT MOVING
                this.bulletTime = this.time.now + 100; // SETS HOW FAST THE BULLET COMES OUT
                this.player.health -= 1; // SHOOT BULLET AT EXPENSE OF OWN HEALTH
            }
        }

        this.player.update();

        this.viruses.forEach(virus => {
            virus.update();
        })

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