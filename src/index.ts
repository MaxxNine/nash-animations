import { INashModel } from './interfaces/model.interface';
import { EContextTypes } from './enums/canvas.enum';
import presets from "./presets";
import Bidimensional from './presets/bidimensional';
import Tridimensional from './presets/tridimensional';

class NashAnimations {

    private container: HTMLDivElement;
    private nashCanvas: Bidimensional | Tridimensional;
    private models: INashModel[];

    constructor (ct?: HTMLDivElement, type?: EContextTypes)  {
        this.container = ct || document.getElementById("nash-animations") as HTMLDivElement;
        this.nashCanvas = presets[type || EContextTypes.BIDIMENSIONAL]();
        this.models = [];
        this.init()
    }

    private init (): void {
        try {
            console.log("Welcome to Nash Animation"); 
            this.nashCanvas.canvas.style.backgroundColor = this.nashCanvas.options.bgColor as string;
            this.container.appendChild(this.nashCanvas.canvas);
        }
        catch (error) {
            console.error("You should add a div with #nash-animations");
        }
    } 

    start(): void {
        requestAnimationFrame(this.animating.bind(this));
    }
    
    add(model: INashModel): void {
        model.add(this.nashCanvas);
        this.models.push(model);
    }

    resize(w: number, h:number): void {
        this.nashCanvas.canvas.width = w;
        this.nashCanvas.canvas.height = h;
    }

    private clearRect(): void {
        const ctx = this.nashCanvas.ctx;
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        // Will always clear the right space
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.restore();
    }
    
    private animating(): void{
        this.clearRect();
        for(let model of this.models) {
            model.animate();          
        }
        requestAnimationFrame(this.animating.bind(this));
    }
} 

export default NashAnimations;