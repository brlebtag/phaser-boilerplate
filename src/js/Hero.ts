import GameScene from "./GameScene";

function constrain(value: number, minimum: number, maximum: number): number {
    return Math.max(Math.min(value, maximum), minimum);
}

function map(value: number, begin1: number, end1: number, begin2: number, end2: number, constrained: boolean = true) {
    const newValue = (value - begin1) / (end1 - begin1) * (end2 - begin2) + begin2;

    if (!constrained) return newValue;

    return begin2 < end2
        ? constrain(newValue, begin2, end2)
        : constrain(newValue, end2, begin2);
}

enum States {
    STANDING,
    WALKING_LEFT,
    WALKING_RIGHT,
    WALKING_UP,
    WALKING_DOWN,
    WALKING_DOWN_LEFT,
    WALKING_DOWN_RIGHT,
    WALKING_UP_LEFT,
    WALKING_UP_RIGHT,
};

const Faces = [
    'walking-right',
    'walking-down',
    'walking-down',
    'walking-left',
    'walking-left',
    'walking-up',
    'walking-up',
    'walking-right',
    'walking-right', 
];

const MaxSpeed = 100;

let tempVet = new Phaser.Math.Vector2(0, 0);

export default class Hero extends Phaser.Physics.Arcade.Sprite {
    public scene: GameScene;
    public body: Phaser.Physics.Arcade.Body;

    constructor(scene: GameScene, x: number, y: number) {
        const texture = "hero";

        super(scene, x, y, texture);

        Object.entries({
            "stop": {
                frameRate: 8, repeat: 0, frames: { start: 0, end: 0 },
            },
            "walking-down": {
                frameRate: 8, repeat: -1, frames: { start: 0, end: 3 },
            },
            "walking-right": {
                frameRate: 8, repeat: -1, frames: { start: 4, end: 7 },
            },
            "walking-up": {
                frameRate: 8, repeat: -1, frames: { start: 8, end: 11 },
            },
            "walking-left": {
                frameRate: 8, repeat: -1, frames: { start: 12, end: 15 },
            },
            "swinging-down": {
                frameRate: 10,repeat: 0, frames: { start: 16, end: 19 },
            },
            "swinging-up": {
                frameRate: 10, repeat: 0, frames: { start: 20, end: 23 },
            },
            "swinging-right": {
                frameRate: 10, repeat: 0, frames: { start: 24, end: 27 },
            },
            "swinging-left": {
                frameRate: 10, repeat: 0, frames: { start: 28, end: 31 },
            },
        })
        .forEach(([key, data]) => {
            const { frameRate, frames, repeat } = data;

            this.scene.anims.create({
                key,
                frameRate,
                repeat,
                frames: this.scene.anims.generateFrameNumbers(texture, frames),
            });
        });

        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.setCollideWorldBounds(true).setState(States.STANDING);
        this.setSize(16, 16);
    }

    update(...args: any[]): void {
        const { body } = this;
        const { left, right, down, up } = this.scene.inputs;

        tempVet.set(
            (left ? -1 : 0) + (right ? 1 : 0),
            (up ? -1 : 0) + (down ? 1 : 0)
        );

        tempVet.setLength(MaxSpeed);

        body.setVelocity(tempVet.x, tempVet.y);

        let velocity = body.velocity.length();
        if (velocity > 0) {
            this.anims.play(Faces[Math.floor(map(body.velocity.angle(), 0, Phaser.Math.PI2, 0, 8))], true);
        } else {
            this.anims.play('stop');
        }        
    }
}