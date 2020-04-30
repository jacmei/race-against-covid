class Virus extends Phaser.Physics.Arcade.Sprite {
    //8 for physical, 20 for ranged
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.scene = scene;
        this.type = type; 
    }

    create() {
        this.createAnimations();
    }

    createAnimations() {
        
        this.scene.anims.create({
            key: "physical_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 0,
                end: 3
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
            key: "physical_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 4,
                end: 5
            })
        });
    }

    update() {
        this.updateHealth();
        
        // BOT MOVEMENT
        // RANDOMLY WALK BACK AND FORTH FOR NOW

        
        
    }

    updateHealth() {
        if (this.health <= 0) {
            this.setVelocity(0);
            this.play(this.type + "dying", true);
            this.on("animationcomplete", () => {
                this.decrementMobCount();
                this.destroy();
            }, this.scene);
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