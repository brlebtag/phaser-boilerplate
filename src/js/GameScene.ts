import Inputs from './Inputs';
import Hero from './Hero';

export default class GameScene extends Phaser.Scene {
    private _inputs: Inputs;
    private hero: Hero;
    private map: Phaser.Tilemaps.Tilemap;

    constructor() {
        super({
            key: "game",
            active: false,
            visible: false,
        });
    }

    public create() {
        this.map = this.make.tilemap({ key: "tilemap" });

        this._inputs = new Inputs(this);

        const { widthInPixels, heightInPixels } = this.map;
        const tileset = this.map.addTilesetImage("tileset");
        this.map.createLayer('Floor', tileset);
        let obstaclesLayer = this.map.createLayer('Obstacles', tileset);
        
        obstaclesLayer.forEachTile((tile: Phaser.Tilemaps.Tile) => {
            if (tile?.properties?.Obstacle) {
                tile.setCollision(true);
            }
        });

        this.hero = new Hero(this, 0, 0);

        this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels);
        this.cameras.main.setBounds(0, 0, widthInPixels, heightInPixels);
        this.cameras.main.startFollow(this.hero, true);
        this.physics.add.collider(this.hero, obstaclesLayer);
    }

    public update(time: number, delta: number): void {
        this.hero.update(time, delta);
    }

    public get inputs() {
        return this._inputs;
    }
}