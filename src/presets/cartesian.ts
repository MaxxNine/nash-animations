export default class Cartesian {
    context: RenderingContext | null;

    constructor(context: RenderingContext | null) {
        this.context = context;
    }

    drawAxis(amount: number): void {
        console.log(amount)
    }
}