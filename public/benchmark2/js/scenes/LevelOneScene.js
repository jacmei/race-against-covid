class LevelOneScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.key = LEVEL_ONE;
        this.timeLeft = 240;
    }

    create() {
        super.loadMap('levelOne');
        super.loadTimer(this.timeLeft);
        super.loadHP();
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
        super.update();
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
    reset(){
        this.timeLeft = 240;
        super.reset();
    }

}