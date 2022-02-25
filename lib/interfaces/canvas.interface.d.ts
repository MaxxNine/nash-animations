import presets from "../presets";
export interface CanvasSettings {
    id: string;
    contextType?: keyof typeof presets;
    bgColor?: string;
    mainColor?: string;
    mainColorAlpha?: string;
    primaryColor?: string;
    secondaryColor?: string;
    infoColor?: string;
    distantColor?: string;
}
//# sourceMappingURL=canvas.interface.d.ts.map