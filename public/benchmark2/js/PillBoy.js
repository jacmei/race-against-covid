class PillBoy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "pillboy");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        this.setImmovable(true);
        
        this.keys = scene.input.keyboard.addKeys('W, A, S, D, Q, E');
        this.scene = scene;
        this.hp = 100; // TBD
        this.tier = TIER_ONE // DEFAULT
        this.canMove = true;

        this.create();
    }

    create() {
        // CHANGE ALL START AND END FRAMES WHEN SPRITESHEET IS COMPLETED
        this.scene.anims.create({
            key: "walk_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 7,
                end: 10
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 7,
                end: 10
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "dead",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "obtain_powerup",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 3
            })
        });
    }

    update() {
        if (this.hp == 0) {
            // TODO
            this.canMove = false;
            this.play("dying", true);
            this.on("animationcomplete", () => {
                console.log("PillBoy Dead");
            }, this.scene)
        }

        if (this.canMove) {
            if (this.keys.W.isDown) {
                this.setVelocityY(-128);
            }
            if (this.keys.A.isDown) {
                this.setVelocityX(-128);
            }
            if (this.keys.S.isDown) {
                this.setVelocityY(128);
            }
            if (this.keys.D.isDown) {
                this.setVelocityX(128);
            }
            if (this.keys.A.isUp && this.keys.D.isUp) {
                this.setVelocityX(0);
            }
            if (this.keys.W.isUp && this.keys.S.isUp) {
                this.setVelocityY(0);
            }
            if (this.body.velocity.x > 0) {
                this.play("walk_right" + this.tier, true);
            } else if (this.body.velocity.x < 0) {
                this.play("walk_left" + this.tier, true);
            } else if (this.body.velocity.y < 0) {
                this.play("walk_up" + this.tier, true);
            } else if (this.body.velocity.y > 0) {
                this.play("walk_down" + this.tier, true);
            }
        }
    }
}