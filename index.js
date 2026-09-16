import Registry from './classes/Registry.js';

export const canvas = document.getElementById('game-screen');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export const ctx = canvas.getContext('2d');

class Game {
    constructor() {
        this.player = undefined;
        this.registry = new Registry();
    }

    initialize = () => {
        // this.player = {
        //     x: 0,
        //     y: 0,
        //     width: 50,
        //     height: 50
        // }

        this.registry.addSystem('MovementSystem');
        this.registry.addSystem('RenderSystem');

        const dummyPositionComponent = {
            name: 'Position',
            value: {
                x: 2, // vorher war es 0
                y: 0,
                width: 50,
                height: 50
            }
        };

        const dummyMovementComponent = {
            name: 'Movement',
            value: {
                vX: 0,
                vY: 0
            }
        };

        const dummySpriteComponent = { // diesen Code im template einfuegen vielleicht nur auskommentiert
            name: 'Sprite',
            value: {
                path: './assets/link.png',
                srcRect: {
                    x: 58,
                    y: -1,
                    width: 19,
                    height: 19
                }
            }
        }

        this.player = this.registry.createEntity([dummyMovementComponent, dummyPositionComponent, dummySpriteComponent]);

        this.registry.addEntityToSystem(this.player)

        // console.log(this.registry.systems);

        document.addEventListener('keyup', this.handleUserInput);
        document.addEventListener('keydown', this.handleUserInput);
    }

    update = () => {

        this.registry.getSystem('MovementSystem').update();
        this.registry.getSystem('RenderSystem').update();
        requestAnimationFrame(this.update);
    }

    render = () => {
        // const { x, y, width, height } = this.player; habe jetzt auskommentiert da es mit end of part 2 nicht uebereinstimmt

        // const { x, y, width, height } = this.player;
        requestAnimationFrame(this.render);
    }

    handleUserInput = (e) => {

        /* 
        
            {
                key: string
                type: string
            }

        */

        const { key, type } = e;

        if (this.player) {
            let playerMovementComponent = this.player.components['Movement'];
            if (type === 'keydown') {

                switch (key) {
                    case 'w':
                        playerMovementComponent.vY = -1;
                        break;
                    case 'a':
                        playerMovementComponent.vX = -1;
                        break;
                    case 's':
                        playerMovementComponent.vY = 1;
                        break;
                    case 'd':
                        playerMovementComponent.vX = 1;
                        break;
                    default:
                        break;
                }

            }
            else if (type === 'keyup') {
                switch (key) {
                    case 'w':
                    case 's': {
                        playerMovementComponent.vY = 0;
                        break;
                    }
                    case 'a':
                    case 'd': {
                        playerMovementComponent.vX = 0;
                        break;
                    }
                    default:
                        break;
                }
            }
        }
    }
}

const game = new Game();
game.initialize();
game.update();
game.render();

