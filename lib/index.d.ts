import { CanvasOptions } from "./interfaces/canvas.interface";
export default class NashCanvas {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    options: CanvasOptions;
    context: RenderingContext | null;
    mode: any;
    constructor(options?: CanvasOptions);
    init(): void;
    getCurrentContext(): string;
}
//# sourceMappingURL=index.d.ts.map