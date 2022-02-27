import NashCanvas from 'src/utils/classes/nash-canvas';

export interface INashModel {
    add(canvas: NashCanvas<RenderingContext>): void,
    animate(): void,
    isAnimating: boolean,
    isAnimatingReverse: boolean,
    
}