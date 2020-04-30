class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.player = null;
        this.map = null;
        this.rooms = [];
        this.floor = null;
        this.collisionLayer = null;
        this.doors = null;
        this.viruses = [];
        this.timer;
        this.timeLeft;
        this.bulletTime = 0; // DETERMINES BULLET FIRE RATE
    }

    create() {
        this.map = this.add.tilemap("levelOne");

        var tileset = this.map.addTilesetImage("tileset");
        this.floor = this.map.createStaticLayer("floor", tileset, 0, 0);
        this.collisionLayer = this.map.createDynamicLayer("collidable", tileset, 0, 0);
        this.doors = this.map.createStaticLayer("doors", tileset, 0, 0);

        //create list of rooms
        this.map.findObject('Objects', function(object) {
            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
            }
            if (object.type === 'Spawn') {
                if (object.name === 'Player') {
                    this.player = new Pill(this, object.x+32, object.y+32);
                }
            }
            if (object.type === 'Melee') {
                let physical_virus = new Virus(this, object.x+32, object.y+32, PHYSICAL);
                this.viruses.push(physical_virus);
            }
            if (object.type === 'Ranged'){
                var ranged_virus = new Virus(this, object.x+32, object.y+32, RANGED);
                this.viruses.push(ranged_virus);
            }
        }, this);

        //move camera to specific room
        this.cameras.main.setBounds(this.rooms[0].x,
            this.rooms[0].y,
            this.rooms[0].width,
            this.rooms[0].height,
            true
        );



        //this.virusbullet = this.physics.add.sprite(this.rooms[0].x + WIDTH/2, this.rooms[0].y + HEIGHT/2, "virusbullet")

        this.viruses.forEach(virus => {
            this.physics.world.addCollider(this.player, virus, () => {
                // SOME ACTION THAT HAPPENS WHEN PLAYER COLLIDES WITH VIRUS
                virus.health = 0; // FILLER
            });
            this.physics.add.collider(virus, this.collisionLayer);
            this.physics.add.collider(this.player, this.doors);
        })


        // on collide with powerup, set the powerup to stone
        this.physics.add.collider(this.player, this.collisionLayer, function(player, object){
            if(object.index == 18){
                object.index = 19;
                player.canMove = false;
                player.points += 1;
            }
        });
        this.collisionLayer.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.player, this.doors);
        this.doors.setCollisionByProperty({collides:true});



        //time variables
        let oneSecond = 1000;
        this.timeLeft = 240

        //display timer
        this.timer = this.add.text(this.rooms[this.player.room].x+15,
                                    this.rooms[this.player.room].y+15,
                                    'Time Left: ' + this.timeLeft, 
                                    {color: 'white', font: '30px'});

        //update timeLeft
        this.time.addEvent({
            delay: 1000,                // ms
            callback: function(){
                if(this.timeLeft > 0){
                    //decrement
                    this.timeLeft--;
                    this.timer.setText('Time Left: ' + this.timeLeft);
                }
            },
            //args: [],
            callbackScope: this,
            loop: true
        });

        //end game if timer runs out
        this.time.delayedCall(this.timeLeft*oneSecond, function(){
            console.log('timer pop');
        });




        //display instructions for hp, and shooting
        let instructionText = this.add.text(this.rooms[this.player.room].x+200,
                                             this.rooms[this.player.room].y+350,
                                             'Click to shoot pills that can damage the viruses. Be careful not to shoot \n'+
                                             'recklessly, as every shot will reduce RX-2020\'s hp',
                                             {color: 'white', font: '15px'});
    }

    update() {
        this.setView();

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


    setView(){
        // On player room change, stop player movement, fade camera, and set boundaries.
        this.cameras.main._ch = this.map.heightInPixels;
        this.cameras.main._cw = this.map.widthInPixels;
        if (this.player.roomChange) {
            // Change camera boundaries when fade out complete.
            this.cameras.main.setBounds(this.rooms[this.player.room].x,
                                        this.rooms[this.player.room].y,
                                        this.rooms[this.player.room].width,
                                        this.rooms[this.player.room].height,
                                        true);
            // Fade back in with new boundaries.
            this.player.canMove = true;
        }
    }

}