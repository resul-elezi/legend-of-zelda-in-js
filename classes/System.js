import { canvas, ctx } from '../index.js';

class System {
    constructor(systemType) {
        this.systemType = systemType;
        this.entities = [];
    }
}

class MovementSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ['Movement', 'Position'];
    }

    update = () => {
        for (let i = 0; i < this.entities.length; i++) {
            const entity = this.entities[i];

            let { Movement, Position } = entity.components;

            Position.x += Movement.vX;
            Position.y += Movement.vY;
        }
    }
}

class RenderSystem extends System {
    constructor(systemType) {
        super(systemType);
        this.componentRequirements = ['Position'];
    }

    update = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // aus der schleife verschoben da es nach jedem update einmal erneuert wird

        for (let i = 0; i < this.entities.length; i++) {

            const { Position, Sprite } = this.entities[i].components; // Sprite eingefuegt
            const { x, y, width, height } = Position;
            const { sprite, srcRect, path } = Sprite; // auf nicht auf dem Template



            ctx.beginPath();
            // ctx.fillStyle = 'red';
            // ctx.fillRect(x, y, width, height);
            ctx.drawImage()
            ctx.stroke();

        }

    }
}

export { MovementSystem, RenderSystem };