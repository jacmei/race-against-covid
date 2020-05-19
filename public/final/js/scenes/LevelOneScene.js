class LevelOneScene extends LevelScene {
    constructor() {
        super({
            key : LEVEL_ONE
        });
        this.key = LEVEL_ONE;
        this.timeLeft = 240;
        this.text = null;
    }

    create() {
        super.loadMap('levelOne');
        super.loadTimer(this.timeLeft);
        super.loadHP();
        super.loadPoints();
        //display instructions for hp, and shooting
        this.add.text(this.rooms[0].x+155,
            this.rooms[0].y+450,
            'Click to shoot pills that can damage the viruses. Be careful not to shoot \n'+
            'recklessly, as every shot will reduce RX-2020\'s HP. You must reach \n'+
            'the stomach with at least 20 HP or else you won\'t be effective enough \n'+
            'to cure the patient! When you are ready, advance to the next room by entering \n' +
            'through the door at the top of this room.',
            {color: 'white', font: '15px'});
        
        //display instructions for hp, and shooting
        this.text = this.add.text(this.rooms[1].x+170,
            this.rooms[1].y+400,
            'Killing viruses awards you with points! Check the top right to see \n' +
            'how many you have. After gathering enough points, you will be able to \n' +
            'upgrade either your weapon or your health. Upgrading your weapon increases \n' +
            'your firing rate. Upgrading your health grants you 20 additional MAX HP. \n' +
            'Try upgrading your weapon (Q) or your health (E) now!',
            {color: 'white', font: '15px'});
        this.text.setVisible(false);
    
        //display instructions for hp, and shooting
        this.add.text(this.rooms[2].x+325,
            this.rooms[2].y+350,
            'Orange slices will heal you for 20 HP!',
            {color: 'white', font: '15px'});

        // physical
        this.physics.add.sprite(this.rooms[0].x+WIDTH/4, this.rooms[0].y+300, 'coronavirus');
        this.add.text(this.rooms[0].x+WIDTH/4-120,
            this.rooms[0].y+340,
            'This virus follows you and \n' +
            'damages you on contact! \n' +
            'Be sure to avoid it so you \n' +
            'don\'t lose too much health!',
            {color: 'white', font: '15px'});
        // ranged
        this.physics.add.sprite(this.rooms[0].x+3*WIDTH/4, this.rooms[0].y+300, 'coronavirus', 16);
        this.add.text(this.rooms[0].x+3*WIDTH/4-150,
            this.rooms[0].y+340,
            'This virus patrols back and forth \n' +
            'while shooting its deadly particles! \n' +
            'Be careful to avoid the particles \n' +
            'or you will be weakened!',
            {color: 'white', font: '15px'});
    }

    update() {
        super.update();
        if (this.viruses.length == 0) {
            this.text.setVisible(true)
        }
    }

    reset(){
        this.timeLeft = 240;
        super.reset();
    }
}