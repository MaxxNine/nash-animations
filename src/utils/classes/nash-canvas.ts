import { canvasDefaultSettings } from "../../config/canvas/canvas-settings";
import { CanvasSettings } from "../../interfaces/canvas.interface";
import { getCurrentContext } from "../functions/canvas-utils";

export default abstract class NashCanvas<ContextType extends RenderingContext> {
    
    canvas: HTMLCanvasElement;
    options: CanvasSettings;
    ctx: ContextType;
    
    constructor(opt?: CanvasSettings, canvas? :HTMLCanvasElement) {
        this.canvas = canvas ? canvas : document.createElement("canvas") as HTMLCanvasElement;
        if (!canvas && opt?.id) this.canvas.setAttribute('id', opt?.id)
        this.options = { 
            id: opt?.id || canvasDefaultSettings.id,
            contextType: opt?.contextType || canvasDefaultSettings.contextType,
            bgColor: opt?.bgColor || canvasDefaultSettings.bgColor,
            mainColor: opt?.mainColor || canvasDefaultSettings.mainColor,
            mainColorAlpha: opt?.mainColor || canvasDefaultSettings.mainColorAlpha,
            primaryColor: opt?.primaryColor || canvasDefaultSettings.primaryColor,
            secondaryColor: opt?.secondaryColor || canvasDefaultSettings.secondaryColor,
            infoColor: opt?.infoColor || canvasDefaultSettings.infoColor
        }
        this.ctx = this.canvas.getContext(getCurrentContext(this.options)) as ContextType;
    }
    
}