class PillBoy extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "pillboy", 21);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        
        this.keys = scene.input.keyboard.addKeys('W, A, S, D, Q, E');
        this.scene = scene;
        this.hp = 100; // TBD
        this.tier = TIER_ONE; // DEFAULT
        this.canMove = true;

        this.create();
    }

    create() {
        // CHANGE ALL START AND END FRAMES WHEN SPRITESHEET IS COMPLETED
        this.scene.anims.create({
            key: "walk_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 84,
                end: 87
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 91,
                end: 94
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 98,
                end: 101
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 77,
                end: 80
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 252,
                end: 255
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 259,
                end: 262
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 266,
                end: 269
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 245,
                end: 248
            })
        });
        this.scene.anims.create({
            key: "walk_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 168,
                end: 172
            })
        });
        this.scene.anims.create({
            key: "walk_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 175,
                end: 178
            })
        });
        this.scene.anims.create({
            key: "walk_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 182,
                end: 185
            })
        });
        this.scene.anims.create({
            key: "walk_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 161,
                end: 164
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 28,
                end: 31
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 35,
                end: 38
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 42,
                end: 45
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 21,
                end: 24
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 196,
                end: 199
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 203,
                end: 206
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 210,
                end: 213
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 189,
                end: 192
            })
        });
        this.scene.anims.create({
            key: "attack_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 112,
                end: 115
            })
        });
        this.scene.anims.create({
            key: "attack_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 119,
                end: 122
            })
        });
        this.scene.anims.create({
            key: "attack_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 126,
                end: 129
            })
        });
        this.scene.anims.create({
            key: "attack_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 105,
                end: 108
            })
        });
        this.scene.anims.create({
            key: "dead",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 0,
                end: 0
            })
        });
        this.scene.anims.create({
            key: "dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 7,
                end: 10
            })
        });
        this.scene.anims.create({
            key: "obtain_powerup",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 14,
                end: 20
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 56,
                end: 59
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 63,
                end: 66
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 70,
                end: 73
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_one",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 49,
                end: 52
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 224,
                end: 227
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 231,
                end: 234
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 238,
                end: 241
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_two",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 217,
                end: 220
            })
        });
        this.scene.anims.create({
            key: "taking_damage_left_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 140,
                end: 143
            })
        });
        this.scene.anims.create({
            key: "taking_damage_right_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 147,
                end: 150
            })
        });
        this.scene.anims.create({
            key: "taking_damage_up_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 154,
                end: 157
            })
        });
        this.scene.anims.create({
            key: "taking_damage_down_tier_three",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("pillboy", {
                start: 133,
                end: 136
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