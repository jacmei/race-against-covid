class Player extends Phaser.Physics.Arcade.Sprite{
    
    constructor(scene, x, y,texture,  frame){
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.currentRoom = 1;
        this.prevRoom = 0;
        // this.roomChange = false;
        this.canMove = true;
        this.vel = 200;
        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
        this.setPosition(x, y);
        this.keys = scene.input.keyboard.addKeys('W,S,A,D,UP,LEFT,RIGHT,DOWN,SPACE');
    }


    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.body.setVelocity(0);
        if (this.scene.input.keyboard.addKey("D").isDown === true) {
            this.body.setVelocityX(this.vel);
        }

        if (this.scene.input.keyboard.addKey("S").isDown === true) {
            this.body.setVelocityY(this.vel);
        }

        if (this.scene.input.keyboard.addKey("A").isDown === true) {
            this.body.setVelocityX(-this.vel);
        }

        if (this.scene.input.keyboard.addKey("W").isDown === true) {
            this.body.setVelocityY(-this.vel);
        }
    }

}