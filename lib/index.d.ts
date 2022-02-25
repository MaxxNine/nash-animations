import { NashModel } from './interfaces/model.interface';
import { EContextTypes } from './enums/canvas.enum';
declare class NashAnimations {
    private container;
    private nashCanvas;
    private models;
    constructor(ct?: HTMLDivElement, type?: EContextTypes);
    private init;
    start(): void;
    add(model: NashModel): void;
    resize(w: number, h: number): void;
    private clearRect;
    private animating;
}
export default NashAnimations;
//# sourceMappingURL=index.d.ts.map