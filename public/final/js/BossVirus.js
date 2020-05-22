class BossVirus extends Virus {
    constructor(scene, x, y, type) {
        super(scene, x, y, 'boss');
        this.type = type;
        this.setVelocityX(BOSS_VIRUS_VELOCITY);
        this.hasReversed = false;
        this.fireRate = this.getRandomFireRateVelocity();
        this.hasFired = false;
        this.health = 30;
        this.canMove = false;
        this.setSize(288, 64);
        this.setOffset(0, 0);
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        super.updateHealth();
        if(this.canMove){
            if(this.body.velocity.x == 0){
                this.setVelocityX(BOSS_VIRUS_VELOCITY);
            }
            this.move();
            this.fire();
        }else{
            this.setVelocityX(0);
        }
    }

    fire() {
        if (this.hasFired == false) {
            if (this.health > 0) {
                this.scene.sound.play("virusattack", {
                    volume: 2
                });
                this.hasFired = true;
                let bulletUpOne = this.scene.physics.add.sprite(this.body.x + this.body.width / 5, this.body.y, "virusslowbullet");
                let bulletUpTwo = this.scene.physics.add.sprite(this.body.x + this.body.width / 4, this.body.y, "virusbullet");
                let bulletUpThree = this.scene.physics.add.sprite(this.body.x + this.body.width / 3, this.body.y, "virusslowbullet");
                let bulletUpFour = this.scene.physics.add.sprite(this.body.x + this.body.width / 2, this.body.y, "virusbullet");
                let bulletUpFive = this.scene.physics.add.sprite(this.body.x + this.body.width / 1, this.body.y, "virusslowbullet");
                let bulletDownOne = this.scene.physics.add.sprite(this.body.x  + this.body.width / 5, this.body.y + this.body.height, "virusbullet");
                let bulletDownTwo = this.scene.physics.add.sprite(this.body.x  + this.body.width / 4, this.body.y + this.body.height, "virusslowbullet");
                let bulletDownThree = this.scene.physics.add.sprite(this.body.x  + this.body.width / 3, this.body.y + this.body.height, "virusbullet");
                let bulletDownFour = this.scene.physics.add.sprite(this.body.x  + this.body.width / 2, this.body.y + this.body.height, "virusslowbullet");
                let bulletDownFive = this.scene.physics.add.sprite(this.body.x  + this.body.width / 1, this.body.y + this.body.height, "virusbullet");
                let bulletLeftOne = this.scene.physics.add.sprite(this.body.x + 5, this.body.y + this.body.height / 2, "virusslowbullet");
                let bulletLeftTwo = this.scene.physics.add.sprite(this.body.x + 5, this.body.y + this.body.height / 2, "virusslowbullet");
                let bulletRightOne = this.scene.physics.add.sprite(this.body.x + this.body.width - 5, this.body.y + this.body.height / 2, "virusslowbullet");
                let bulletRightTwo = this.scene.physics.add.sprite(this.body.x + this.body.width - 5, this.body.y + this.body.height / 2, "virusslowbullet");
                bulletUpOne.setVelocityY(-this.getRandomBulletVelocity());
                bulletUpTwo.setVelocityY(-this.getRandomBulletVelocity());
                bulletUpThree.setVelocityY(-this.getRandomBulletVelocity());
                bulletUpFour.setVelocityY(-this.getRandomBulletVelocity());
                bulletUpFive.setVelocityY(-this.getRandomBulletVelocity());
                bulletDownOne.setVelocityY(this.getRandomBulletVelocity());
                bulletDownTwo.setVelocityY(this.getRandomBulletVelocity());
                bulletDownThree.setVelocityY(this.getRandomBulletVelocity());
                bulletDownFour.setVelocityY(this.getRandomBulletVelocity());
                bulletDownFive.setVelocityY(this.getRandomBulletVelocity());
                bulletLeftOne.setVelocityX(-this.getRandomBulletVelocity());
                bulletLeftTwo.setVelocityX(-this.getRandomBulletVelocity());
                bulletRightOne.setVelocityX(this.getRandomBulletVelocity());
                bulletRightTwo.setVelocityX(this.getRandomBulletVelocity());
                let bullets = [bulletUpOne, bulletUpTwo, bulletUpThree, bulletUpFour, bulletUpFive,
                            bulletDownOne, bulletDownTwo, bulletDownThree, bulletDownFour, bulletDownFive,
                            bulletLeftOne, bulletLeftTwo, bulletRightOne, bulletRightTwo];
                bullets.forEach(bullet => {
                    this.scene.physics.world.addCollider(bullet, this.scene.player, () => {
                        if (this.scene.player.canMove && !this.scene.player.isTakingDamage) {
                            this.scene.player.isTakingDamage = true;
                            this.scene.player.health -= 10;
                            this.scene.player.isSlowed = true;
                            this.scene.time.addEvent({
                                delay: 1500,
                                callback: () => {
                                    this.scene.player.isSlowed = false;
                                }
                            });
                            this.scene.player.play("taking_damage_" + this.scene.player.direction.toLowerCase() + this.scene.player.tier, false);
                            this.scene.player.on("animationcomplete", () => {
                                this.scene.player.isTakingDamage = false;
                            });
                        }
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.collisionLayer, () => {
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.doors, () => {
                        bullet.destroy();
                    });
                    this.scene.physics.world.addCollider(bullet, this.scene.openDoors, () => {
                        bullet.destroy();
                    });
                });
                let timer = this.scene.time.addEvent({
                    delay: this.fireRate,
                    callback: () => {
                        this.hasFired = false;
                        this.fireRate = Math.floor(Math.random() * (BOSS_VIRUS_BULLET_MAX_FIRERATE - BOSS_VIRUS_BULLET_MIN_FIRERATE + 1)) + BOSS_VIRUS_BULLET_MIN_FIRERATE;
                    }
                });
            }
        }
    }

    move() {
        if (this.health > 0) {
            if (!this.hasReversed) {
                let timer = this.scene.time.addEvent({
                    delay: this.getRandomMovementDelay(),
                    callback: () => {
                        this.setVelocityX(-this.body.velocity.x);
                        this.hasReversed = false;
                    }
                });
            }
            this.hasReversed = true;
            this.play("boss_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "boss_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("boss", {
                start: 0,
                end: 0
            })
        });
        this.scene.anims.create({
            key: "boss_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("boss", {
                start: 4,
                end: 7
            })
        });
    }

    getRandomBulletVelocity() {
        return Math.floor(Math.random() * (BOSS_VIRUS_BULLET_MAX_VELOCITY - BOSS_VIRUS_BULLET_MIN_VELOCITY + 1)) + BOSS_VIRUS_BULLET_MIN_VELOCITY;
    }
    
    getRandomFireRateVelocity() {
        return Math.floor(Math.random() * (BOSS_VIRUS_BULLET_MAX_FIRERATE - BOSS_VIRUS_BULLET_MIN_FIRERATE + 1)) + BOSS_VIRUS_BULLET_MIN_FIRERATE;
    }

    getRandomMovementDelay() {
        return Math.floor(Math.random() * (2000 - 1500 + 1)) + 1500;
    }
}