import { defaultOptions } from "./config/canvasSettings";
import presets from "./presets";
import { CanvasOptions } from "./interfaces/canvas.interface";
import { getCurrentContext } from "./utils/canvasUtils";

const NashCanvas = (ct?: HTMLDivElement, opt?: CanvasOptions) =>  {
    const container = ct || document.getElementById("nash-animations") as HTMLDivElement;
    const canvas = document.createElement("canvas") as HTMLCanvasElement;
    const options: CanvasOptions = {
        type: opt?.type || defaultOptions.type,
        bgColor: opt?.bgColor || defaultOptions.bgColor,
        mainColor: opt?.mainColor || defaultOptions.mainColor,
        primaryColor: opt?.primaryColor || defaultOptions.primaryColor,
        secondaryColor: opt?.secondaryColor || defaultOptions.secondaryColor,
        infoColor: opt?.infoColor || defaultOptions.infoColor
    };
    let context = canvas.getContext(getCurrentContext(options)); 
    let mode;
    
    const start = (): void => {
        canvas.style.backgroundColor = options.bgColor;
        mode = presets[options.type](context);
        try {
            container.appendChild(canvas);
        }
        catch (error) {
            console.error("You should add a div with #nash-animations");
        }
    }

    return {
        start,
    }
} 

export default NashCanvas;