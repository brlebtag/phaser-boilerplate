export default class LoaderScene extends Phaser.Scene {
    public preload() {
        this.load.spritesheet('tileset', './assets/images/tileset.png', {
            frameWidth: 16,
            frameHeight: 16,
        });

        this.load.spritesheet('hero', './assets/images/hero.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.spritesheet('log', './assets/images/log.png', {
            frameWidth: 32,
            frameHeight: 32,
        });

        this.load.tilemapTiledJSON('tilemap', './assets/tilemaps/tilemap.json');
    }

    public create() {
        this.scene.start("game");
    }
}