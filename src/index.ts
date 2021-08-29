import { defaultOptions } from "@config/canvasSettings";
import presets from "./presets";
import { ECanvasTypes } from "@enums/canvas.enum";
import { CanvasOptions } from "@interfaces/canvas.interface";

export default class NashCanvas {
    container: HTMLDivElement;
    canvas: HTMLCanvasElement;
    options: CanvasOptions;
    context: RenderingContext | null;
    mode: any;

    constructor (options?: CanvasOptions) {
        this.container = document.getElementById("nash-animations") as HTMLDivElement;
        this.canvas = document.createElement("canvas");
        this.options = {
            type: options?.type || defaultOptions.type,
            bgColor: options?.bgColor || defaultOptions.bgColor,
            mainColor: options?.mainColor || defaultOptions.mainColor,
            primaryColor: options?.primaryColor || defaultOptions.primaryColor,
            secondaryColor: options?.secondaryColor || defaultOptions.secondaryColor,
            infoColor: options?.infoColor || defaultOptions.infoColor
        }
        this.context = this.canvas.getContext(this.getCurrentContext())
        this.init();
    }

    init(): void {
        this.canvas.style.backgroundColor = this.options.bgColor;
        this.mode = presets[this.options.type](this.context);
        this.mode.drawAxis(12);
        this.container.appendChild(this.canvas);
    }

    getCurrentContext(): string {
        if (this.options.type === ECanvasTypes.WEBGL)
            return 'webgl'
        return '2d';
    }
} 