import "phaser";
import LoaderScene from "./LoaderScene";
import GameScene from "./GameScene";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 256,
    height: 224,
    zoom: 2,
    input: {
        keyboard: true,
        gamepad: true,
    },
    render: {
        pixelArt: true,
        antialias: false,
        antialiasGL: false,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
    scene: [LoaderScene, GameScene],
};

window.addEventListener("load", () => {
    new Phaser.Game(config);
});