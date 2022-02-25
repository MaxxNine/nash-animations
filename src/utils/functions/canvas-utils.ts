import { CanvasSettings } from "../../interfaces/canvas.interface";
import { EContextTypes } from "../../enums/canvas.enum";

export const getCurrentContext = (options: CanvasSettings): string => {
    if (options.contextType === EContextTypes.TRIDIMENSIONAL)
        return 'webgl'
    return '2d';
}