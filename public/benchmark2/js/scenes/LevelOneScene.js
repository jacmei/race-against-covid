class LevelOneScene extends Phaser.Scene {

    constructor() {
        super({
            key : LEVEL_ONE
        });
    }
    

    create() {
        var map = this.add.tilemap("levelOne");

        var tileset = map.addTilesetImage("tileset");
        console.log(tileset);
        this.floor = map.createStaticLayer("floor", tileset, 0, 0);
        this.collidables = map.createStaticLayer("collidable", tileset, 0, 0);
        this.doors = map.createStaticLayer("doors", tileset, 0, 0);
        



        //create list of rooms
        var rooms = [];
        map.findObject('Objects', function(object) {
            // rooms
            if (object.type === 'Room') {
                rooms.push(object);
            }
        }, this);

        //move camera to specific room
        this.cameras.main.setBounds(rooms[0].x,
            rooms[0].y,
            rooms[0].width,
            rooms[0].height,
            true);
        
        
        var key1 = this.input.keyboard.addKey('ONE');
        var key2 = this.input.keyboard.addKey('TWO');
        var key3 = this.input.keyboard.addKey('THREE');
        var camera = this.cameras.main;
        key1.on("down", function(event){
            camera.setBounds(rooms[0].x,
            rooms[0].y,
            rooms[0].width,
            rooms[0].height,
            true);
        });
        key2.on("down", function(event){
            camera.setBounds(rooms[1].x,
            rooms[1].y,
            rooms[1].width,
            rooms[1].height,
            true);
        });
        key3.on("down", function(event){
            camera.setBounds(rooms[2].x,
            rooms[2].y,
            rooms[2].width,
            rooms[2].height,
            true);
        });

    }
}