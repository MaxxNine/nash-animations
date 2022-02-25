import NashCanvas from "../utils/classes/nash-canvas";

export default class Tridimensional extends NashCanvas<CanvasRenderingContext2D> {
    
    constructor() {
        super({id: 'nash-3d-canvas', contextType: 'tridimensional'});
        this.init();
    }
    
    init(): void{
        
    }
}