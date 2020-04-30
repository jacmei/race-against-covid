class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.key = LEVEL_ONE;
        this.player = null;
        this.map = null;
        this.rooms = [];
        this.visited = [];
        this.floor = null;
        this.collisionLayer = null;
        this.doors = null;
        this.openDoors=null;
        this.viruses = [];
        this.timer;
        this.timeLeft;
        this.hpText;
        this.virusCount = [];
        this.winTile;
    }

    create() {
        this.map = this.add.tilemap("levelOne");

        var tileset = this.map.addTilesetImage("tileset");
        this.floor = this.map.createStaticLayer("floor", tileset, 0, 0);
        this.collisionLayer = this.map.createDynamicLayer("collidable", tileset, 0, 0);
        this.openDoors = this.map.createStaticLayer("openDoors", tileset, 0, 0);
        this.doors = this.map.createStaticLayer("doors", tileset, 0, 0);

        //create list of rooms
        this.map.findObject('Objects', function(object) {
            // rooms
            if (object.type === 'Room') {
                this.rooms.push(object);
                let x = object.properties.find(function(property) {
                    return property.name === 'monsters';
                }).value;
                let visited = object.properties.find(function(property) {
                    return property.name === 'visited';
                } ).value;
                this.virusCount.push(x);
                this.visited.push(visited);
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

        console.log(this.visited);

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
                player.health += 20;
            }
        });
        this.collisionLayer.setCollisionByProperty({collides:true});
        this.physics.add.collider(this.player, this.doors);
        this.doors.setCollisionByProperty({collides:true});

        
        this.physics.add.overlap(this.player,  this.openDoors, function(player, tile) {
            if(tile.properties.win){
                if(Math.abs(tile.x*tile.width-this.player.x)<=40 && Math.abs(tile.y*tile.height-this.player.y)<=40){
                    console.log('winner');
                }
            }
        }, null, this);




        //time variables
        let oneSecond = 1000;
        this.timeLeft = 240

        //display timer
        this.timer = this.add.text(this.rooms[this.player.room].x+15,
                                    this.rooms[this.player.room].y+15,
                                    'Time Left: ' + this.timeLeft, 
                                    {color: 'white', font: '20px'});

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


        
        //display current HP
        this.hpText = this.add.text(this.rooms[0].x+820,
            this.rooms[0].y+15,
            'HP:'+this.player.health+'/'+this.player.maxHealth,
            {color: 'white', font: '20px'});

        //display instructions for hp, and shooting
        this.add.text(this.rooms[0].x+200,
            this.rooms[0].y+350,
            'Click to shoot pills that can damage the viruses. Be careful not to shoot \n'+
            'recklessly, as every shot will reduce RX-2020\'s hp. You must reach \n'+
            'the stomach with at least 20 hp or else you won\'t be effective enough \n'+
            'to cure the patient!',
            {color: 'white', font: '15px'});
        
        
        //display instructions for hp, and shooting
        this.add.text(this.rooms[2].x+200,
            this.rooms[2].y+350,
            'After picking up an upgrade, press q or e to upgrade \n'+
            'your weapon or health before continuing the game. \n'+
            'You will not be able to move until after you \n'+
            'upgrade, and your weapon can only be upgraded 2 times',
            {color: 'white', font: '15px'});
        
        
    }

    update() {
        this.setView();

        

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
        

        if (Phaser.Input.Keyboard.JustDown((this.input.keyboard.addKey('ESC')))) {
            console.log("esc pressed");
            this.scene.launch(PAUSE);
            let pauseScene = this.scene.get(PAUSE);
            pauseScene.pausedScene = this;
            this.scene.pause();
            this.scene.bringToTop(PAUSE);
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
            this.timer.setPosition(this.rooms[this.player.room].x+15, this.rooms[this.player.room].y+15);
            this.hpText.setPosition(this.rooms[this.player.room].x+820, this.rooms[this.player.room].y+15);
            // Fade back in with new boundaries.
            this.player.canMove = true;

        }
    }
    reset(){
        this.key = LEVEL_ONE;
        this.player = null;
        this.map = null;
        this.rooms = [];
        this.visited = [];
        this.floor = null;
        this.collisionLayer = null;
        this.doors = null;
        this.openDoors=null;
        this.viruses = [];
        this.timer;
        this.timeLeft;
        this.bulletTime = 0; // DETERMINES BULLET FIRE RATE
        this.hpText;
        this.virusCount=[];
    }

    lose(){

    }
}