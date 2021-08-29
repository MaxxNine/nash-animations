export default class Cartesian {
    ctx: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D | null) {
        this.ctx = context as CanvasRenderingContext2D;
        this.init();
    }

    init(): void{
        
    }

    drawVector(origin: number, end: number): void {
        this.ctx.lineWidth = 2;
    }
}