class RangedVirusOne extends Virus {
    constructor(scene, x, y, type) {
        super(scene, x, y, type);
        this.setVelocityX(RANGED_VIRUS_ONE_VELOCITY);
        this.hasReversed = false;
        this.create();

    }

    create() {
        this.createAnimations();
    }

    update() {
        this.updateHealth();
        this.move();
    }

    move() {
        if (this.health > 0) {
            if (this.hasReversed) {
                let timer = this.scene.time.addEvent({
                    delay: this.fireRate,
                    callback: () => {
                        this.setVelocityX = -this.body.velocity.x;
                        this.hasReversed = true;
                    }
                });
            }
            this.hasReversed = false;
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "ranged_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 12,
                end: 15
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
            key: "ranged_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 16,
                end: 17
            })
        });
    }


}