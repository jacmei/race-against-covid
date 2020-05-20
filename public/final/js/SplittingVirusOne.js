class SplittingVirusOne extends Virus {
    constructor(scene, x, y, type, split) {
        super(scene, x, y, 'coronavirus');
        this.type = type;
        this.splitted = split;
        if (split) {
            this.velocity = SPLIT_VIRUS_ONE_SPLIT_VELOCITY;
            this.setSize(32, 32);
            this.setScale(0.5)
        }
        else {
            this.velocity = SPLIT_VIRUS_ONE_VELOCITY;
        }
        this.angleToPlayer = null;
        this.health = 3;
        this.canMove = false;
        this.create();
    }

    create() {
        this.createAnimations();
    }

    update() {
        //super.updateHealth();
        this.updateHealth();
        if(this.canMove){
            this.move();
        }
    }

    updateHealth() {
        if (this.health <= 0 && this.splitted) {
            this.canMove = false;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.play(this.type + "dying", true);
            this.on("animationcomplete", () => {
                this.scene.viruses.forEach( (v, index) => {
                    if (v == this) {
                        this.decrementMobCount();
                        this.scene.viruses.splice(index, 1);
                        this.setActive(false);
                        this.scene.player.points += 10
                    }
                });
            });
        }
        else if (this.health <= 0 && !this.splitted) {
            this.scene.viruses.forEach( (v, index) => {
                if (v == this) {
                    this.decrementMobCount();
                    this.scene.viruses.splice(index, 1);
                    this.splitVirus();
                    this.scene.player.points += 20
                    this.destroy();
                }
            });
        }
    }

    splitVirus() {
        let split_one = new SplittingVirusOne(this.scene, this.x-50, this.y, SPLIT, true);
        split_one.canMove = true;
        let split_two = new SplittingVirusOne(this.scene, this.x+50, this.y, SPLIT, true);
        split_two.canMove = true;
        this.split_viruses = [split_one, split_two]
        this.split_viruses.forEach(virus => {
            // this.scene.player undefined..?
            this.scene.physics.world.addCollider(this.scene.player, virus, () => { 
                if (virus.canMove && this.scene.player.canMove && !this.scene.player.isTakingDamage) {
                    this.scene.player.isTakingDamage = true;
                    this.scene.player.health -= 10;
                    this.scene.player.play("taking_damage_" + this.scene.player.direction.toLowerCase() + this.scene.player.tier, false);
                    this.scene.player.on("animationcomplete", () => {
                        let timer = this.scene.time.addEvent({
                            delay: 1000,
                            callback: () => {
                                this.scene.player.isTakingDamage = false;
                            }
                        });
                    });
                }
            });
            this.scene.physics.add.collider(virus, this.scene.collisionLayer);
            this.scene.physics.add.collider(virus, this.scene.doors);
        })
        this.scene.viruses.push(split_one);
        this.scene.viruses.push(split_two);
        this.incrementMobCount();
        this.incrementMobCount();
    }

    move() {
        if (this.health > 0) {
            let thisX = this.body.x + this.body.width / 2;
            let thisY = this.body.y + this.body.height / 2;
            let pillX = this.scene.player.body.x + this.scene.player.width / 2;
            let pillY = this.scene.player.body.y + this.scene.player.height / 2;
            this.angleToPlayer = Phaser.Math.Angle.Between(thisX, thisY, pillX, pillY);
            let xVelocity = Math.cos(this.angleToPlayer) * this.velocity;
            let yVelocity = Math.sin(this.angleToPlayer) * this.velocity;
            
            this.setVelocityX(xVelocity);
            this.setVelocityY(yVelocity);
            this.play("split_travel", true);
        }
    }

    createAnimations() {
        this.scene.anims.create({
            key: "split_dying",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 0,
                end: 3
            })
        });
       
        this.scene.anims.create({
            key: "split_travel",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 8,
                end: 11
            })
        });
        
        this.scene.anims.create({
            key: "split_taking_damage",
            frameRate: ANIMATION_FRAME_RATE,
            frames : this.scene.anims.generateFrameNumbers("coronavirus", {
                start: 4,
                end: 5
            })
        });
    }
}