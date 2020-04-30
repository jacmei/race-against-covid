class Virus extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, type) {
        super(scene, x, y, "coronavirus", (type == PHYSICAL ? 8 : 20));
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        
        this.scene = scene;
        this.health = 10; // TBD
        this.type = type; // PHYSICAL or RANGE
        
        this.walkTimer = 0; // for simply moving back and forth
        this.velocity = 64;

        this.create();
    }

    create() {
        this.scene.anims.create({
            key: "ranged_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 12,
                end: 15
            })
        });
        this.scene.anims.create({
            key: "physical_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "ranged_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 20,
                end: 21
            })
        });
        this.scene.anims.create({
            key: "physical_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 8,
                end: 11
            })
        });
        this.scene.anims.create({
            key: "ranged_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 16,
                end: 17
            })
        });
        this.scene.anims.create({
            key: "physical_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 4,
                end: 5
            })
        });
    }

    update() {
        this.checkHealth();
        
        // BOT MOVEMENT
        // RANDOMLY WALK BACK AND FORTH FOR NOW
        if (this.health > 0) {
            if (this.scene.time.now > this.walkTimer) {
                this.setVelocityX(-this.velocity);
                this.velocity = -this.velocity;
                this.walkTimer = this.scene.time.now + 500;
            }
        }

        
        
    }

    checkHealth() {
        if (this.health == 0) {
            // TODO
            this.setVelocity(0);
            this.play(this.type + "dying", true);
            this.on("animationcomplete", () => {
                console.log("Virus Dead");
                this.decrementMobCount();
                this.destroy();
            }, this.scene)
            this.scene.viruses.forEach( (v, index) => {
                if (v == this) this.scene.viruses.splice(index, 1);
            })
        }
    }

    decrementMobCount(){
        for(let room in this.scene.rooms){
            let roomLeft   = this.scene.rooms[room].x;
            let roomRight  = this.scene.rooms[room].x + this.scene.rooms[room].width;
            let roomTop    = this.scene.rooms[room].y;
            let roomBottom = this.scene.rooms[room].y + this.scene.rooms[room].height;
            // Virus is within the boundaries of this room.
            if (this.x > roomLeft && this.x < roomRight &&
                this.y > roomTop  && this.y < roomBottom) {
                this.scene.virusCount[room]--;
            }
        }
    }
}