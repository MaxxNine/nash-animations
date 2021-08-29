import { CanvasOptions } from "src/interfaces/canvas.interface";
import { ECanvasTypes } from "../enums/canvas.enum";

export const getCurrentContext = (options: CanvasOptions): string => {
    if (options.type === ECanvasTypes.WEBGL)
        return 'webgl'
    return '2d';
}