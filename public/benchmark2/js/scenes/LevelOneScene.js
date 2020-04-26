class LevelOneScene extends Phaser.Scene {

    constructor() {
        super({
            key : LEVEL_ONE
        });
    }

    create() {
        var map = this.add.tilemap("levelOneRoomOne");

        var tileset = map.addTilesetImage("maptileset", "mapTiles")
        console.log(map);
        console.log(tileset);
        var floor = map.createStaticLayer("floor", tileset, 0, 0);
        var collidables = map.createStaticLayer("collidable", tileset, 0, 0);
        var doors = map.createStaticLayer("doors", tileset, 0, 0);
    }
}