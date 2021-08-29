import presets from "../presets"

export interface CanvasOptions {
    type: keyof typeof presets,
    bgColor: string,
    mainColor: string,
    primaryColor: string,
    secondaryColor: string,
    infoColor: string,
}