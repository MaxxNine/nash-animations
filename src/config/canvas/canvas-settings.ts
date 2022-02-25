import { EContextTypes } from "../../enums/canvas.enum";
import { CanvasSettings } from "../../interfaces/canvas.interface";


export const canvasDefaultSettings: CanvasSettings = {
    id: 'nash-2d-canvas',
    contextType: EContextTypes.BIDIMENSIONAL ,
    bgColor: "#172026",
    mainColor: "#e9e9e9",
    mainColorAlpha: "#e9e9e950",
    primaryColor: "#5FCDD9",
    secondaryColor: "#04BFAD",
    infoColor: "#027373",
    distantColor: "#04BF9D", 
}
