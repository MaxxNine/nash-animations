
export default abstract class NashModel {
    
    protected cnv?: HTMLCanvasElement;
    protected ctx?: RenderingContext;
    
    constructor() {
    }

    // Public Methods

    transfer(canvas: HTMLCanvasElement, context: RenderingContext): void {
        this.cnv = canvas;
        this.ctx = context;
        this.clearRect();
    }

    getNashInfo(): string{
        return `Canvas width: ${this.cnv?.width} \n Canvas height: ${this.cnv?.height}`;
    }

    // Internal Methods

    protected getCanvas2D(): CanvasRenderingContext2D {
        return this.ctx as CanvasRenderingContext2D;
    }
    
    protected clearRect(): void {
        const ctx = this.getCanvas2D();
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        // Will always clear the right space
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.restore();
    }

    protected setOrigin(x: number, y: number) {
        const ctx = this.getCanvas2D();
        ctx.beginPath();
        ctx.translate(x, y);
    }

    
}