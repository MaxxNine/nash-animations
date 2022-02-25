import { CanvasSettings } from "../../interfaces/canvas.interface";
export default abstract class NashCanvas<ContextType extends RenderingContext> {
    canvas: HTMLCanvasElement;
    options: CanvasSettings;
    ctx: ContextType;
    constructor(opt?: CanvasSettings, canvas?: HTMLCanvasElement);
}
//# sourceMappingURL=nash-canvas.d.ts.map