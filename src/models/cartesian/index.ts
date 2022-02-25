import { solveFunction } from './../../utils/functions/index';
import { NashModel } from './../../interfaces/model.interface';
import { canvasDefaultSettings } from './../../config/canvas/canvas-settings';
import { CanvasSettings } from './../../interfaces/canvas.interface';
import { cartesianDefaultSettings } from './cartesian-settings';
import { ICartesian } from './cartesian.interface';
import NashCanvas from './../../utils/classes/nash-canvas';
import { getNearHighAndRoundedNumber, isNumber } from './../../utils/math';

export default class Cartesian implements NashModel {
    
    private cnv?: HTMLCanvasElement;
    private ctx?: RenderingContext;
    private settings: ICartesian;
    private cnvSettings: CanvasSettings;
    private grid_size_x: number;
    private grid_size_y: number;
    private num_lines_x: number;
    private num_lines_y: number;
    private currentWidth: number;
    private currentHeight: number;
    private animationDuration: number;
    private width: number;
    private height: number;
    private label_x: any;
    private label_y: any;
    private graphs: any[];
    private translation: {
        x:  number, 
        y:  number
    };
    isAnimating: boolean;
    isAnimatingReverse: boolean;
    
    // CONSTANTS
    private GRID_SIZE = 25;
    
    constructor() {
        this.settings = cartesianDefaultSettings;
        this.cnvSettings = canvasDefaultSettings;
        this.isAnimating = false;
        this.isAnimatingReverse = false;
        this.grid_size_x = 0;
        this.grid_size_y = 0;
        this.num_lines_x = 0;
        this.num_lines_y = 0;
        this.width = 0;
        this.height = 0;
        this.currentWidth = 0;
        this.currentHeight = 0;
        this.animationDuration = 0;
        this.graphs = [];
        this.translation = {x: 0, y: 0};
    }
    
    add(nashCanvas: NashCanvas<RenderingContext>): void {
        this.cnv = nashCanvas.canvas;
        this.ctx = nashCanvas.ctx;
        this.cnvSettings = nashCanvas.options;
    }

    draw2D(width: number, height: number, seconds = 2) {
        // SETUP
        const cnv = this.cnv as HTMLCanvasElement;
        const ctx = this.ctx as CanvasRenderingContext2D;
        const oX = this.settings.originX;
        const oY = this.settings.originY;
        const s = this.settings;
        this.width = width*cnv.width;
        this.height = height*cnv.height;
        this.grid_size_x = this.GRID_SIZE*(s.scaleY as number);
        this.grid_size_y = this.GRID_SIZE*(s.scaleX as number);
        this.num_lines_x = Math.floor(this.height/this.grid_size_y);
        this.num_lines_y = Math.floor(this.width/this.grid_size_x);
        this.settings.originX = oX === -1 ? Math.floor(this.num_lines_x/2) : oX;
        this.settings.originY = oY === -1 ? Math.floor(this.num_lines_y/2) : oY;
        this.label_x =  { number: 1*(s.densityX as number), suffix: ''}
        this.label_y =  { number: 1*(s.densityY as number), suffix: ''}
        this.animationDuration = seconds;
        this.isAnimating = true;
    }

    addGraph2D(exp: string, interval: number[]): void {
        this.graphs.push({exp, interval});
    }

    private plotGraph2D(exp: string, interval: number[]) {
        let density = 0.01;
        let results = solveFunction(exp, interval, density);
        const [yMin, yMax] = [Math.min(...results), Math.max(...results)];
        const [xMin, xMax] = interval;
        const ctx = this.ctx as CanvasRenderingContext2D;
        const { highValue, roundedNumber } = getNearHighAndRoundedNumber(yMax);
        this.settings.densityY = (this.height)/(Math.abs(highValue*2));
        this.settings.densityX = (this.width)/Math.abs((interval[1] - interval[0])/density);
        this.num_lines_y = Math.ceil(xMax - xMin);
        this.num_lines_x = Math.ceil(xMax - xMin);
        this.settings.originX = Math.floor(this.num_lines_x/2);
        this.settings.originY = Math.floor(this.num_lines_y/2);        
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.cnvSettings.primaryColor as string;
        ctx.beginPath();
        for (let i = 0; i < results.length; i++) {
            let y = 0;
            y=y-(results[i]*this.settings.densityY);
            let x = (xMin*this.grid_size_x) + (this.settings.densityX)*i;
            if(i==0) ctx.moveTo(x, y)
            else if (!isNumber(results[i-1]) 
            || (results[i-1] < 0 && results[i] > 0)
            || (results[i-1] > 0 && results[i] < 0)
            ) {
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
            else if (isNumber(results[i])) ctx.lineTo(x, y)
        } 
        ctx.stroke();
    }


    animate(): void {
        const ctx = this.ctx as CanvasRenderingContext2D;
        const showX = this.settings.showGridX as boolean;
        const showY = this.settings.showGridY as boolean;
        const x_origin = this.settings.originX as number;
        const y_origin = this.settings.originY as number;
        this.grid_size_y = this.height/this.num_lines_x;
        this.grid_size_x = this.width/this.num_lines_y;
        this.drawX(ctx, showX, this.grid_size_y, x_origin, this.label_x, this.num_lines_x, this.currentWidth*this.width);
        this.drawY(ctx, showY, this.grid_size_x, y_origin, this.label_y, this.num_lines_y, this.currentHeight*this.height); 
        ctx.save();
        this.centerOrigin();
        this.drawXTicks();
        this.drawYTicks();
        ctx.restore();
        if (this.isAnimating) {
            this.currentWidth += (1/(this.animationDuration*60));
            this.currentHeight += (1/(this.animationDuration*60));             
        }
        else {
            for(let v of this.graphs) {
                ctx.save();
                this.centerOrigin();
                this.plotGraph2D(v.exp, v.interval);
                ctx.restore();
            }
        }
        if (this.currentWidth > 1 && this.currentHeight > 1) {
            this.isAnimating = false;
        }
        
    }

    private drawX(ctx: CanvasRenderingContext2D, show_grid: boolean, grid_size: number, origin: number, label: any, num_lines: number, width: number) {
        let start = show_grid ? 0 : origin;
        let end = show_grid ? num_lines : origin;
        for (let i = start; i <= end; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
                if (i === origin) 
                ctx.strokeStyle = this.cnvSettings.mainColor as string;
            else 
                ctx.strokeStyle = this.cnvSettings.mainColorAlpha as string;
            if (i === end) {
                ctx.moveTo(-this.translation.x, grid_size*i); 
                ctx.lineTo(width - this.translation.x, grid_size*i);
            }
            else {
                ctx.moveTo(-this.translation.x, (grid_size*i)+0.5);
                ctx.lineTo(width - this.translation.x, (grid_size*i)+0.5);
            }
            ctx.stroke();
        }
    }  

    private drawY(ctx: CanvasRenderingContext2D, show_grid: boolean, grid_size: number, origin: number, label: any, num_lines: number, height: number) {
        let start = show_grid ? 0 : origin;
        let end = show_grid ? num_lines : origin;
        for (let i = start; i <= end; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
                if (i === origin) 
                ctx.strokeStyle = this.cnvSettings.mainColor as string;
            else 
                ctx.strokeStyle = this.cnvSettings.mainColorAlpha as string;
            if (i === end) {
                ctx.moveTo(grid_size*i, -this.translation.y);
                ctx.lineTo(grid_size*i, height - this.translation.y);
            }
            else {
                ctx.moveTo((grid_size*i)+0.5, -this.translation.y);
                ctx.lineTo((grid_size*i)+0.5, height - this.translation.y);
            }
            ctx.stroke();
        }
    }  
    
    private drawXTicks() {
        const ctx = this.ctx as CanvasRenderingContext2D;
        const oY = this.settings.originY as number;
        // Ticks marks along the positive X-axis
        for(let i=1; i<(this.num_lines_y - oY); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor as string;

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(this.grid_size_x*i+0.5, -3);
            ctx.lineTo(this.grid_size_x*i+0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillStyle = this.cnvSettings.mainColor as string;
            ctx.fillText(this.label_x.number*i + this.label_x.suffix, this.grid_size_x*i-2, 15);
        }

        // Ticks marks along the negative X-axis
        for(let i=1; i<oY; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor as string;
            
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-this.grid_size_x*i+0.5, -3);
            ctx.lineTo(-this.grid_size_x*i+0.5, 3);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-this.label_x.number*i + this.label_x.suffix, -this.grid_size_x*i+3, 15);
        }

    }

    private drawYTicks() {
        const ctx = this.ctx as CanvasRenderingContext2D;
        const oX = this.settings.originX as number;
        
        // Ticks marks along the positive Y-axis
        for(let i=1; i<(this.num_lines_x - oX); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor as string;

            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, this.grid_size_y*i+0.5);
            ctx.lineTo(3, this.grid_size_y*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillStyle = this.cnvSettings.mainColor as string;
            ctx.fillText(this.label_y.number*i + this.label_y.suffix, 15, this.grid_size_y*i+3);
        }

        // Ticks marks along the negative Y-axis
        for(let i=1; i<oX; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor as string;
            
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, -this.grid_size_y*i+0.5);
            ctx.lineTo(3, -this.grid_size_y*i+0.5);
            ctx.stroke();

            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-this.label_y.number*i + this.label_y.suffix, 15, -this.grid_size_y*i+3);
        }

    }


    setSettings(options: ICartesian) {
        this.settings = {...this.settings, ...options};  
    }

    private centerOrigin() {
        const oX = this.settings.originX as number;
        const oY = this.settings.originY as number;
        this.setOrigin(oY*this.grid_size_x, oX*this.grid_size_y)
    } 

    private setOrigin(x: number, y: number) {
        const ctx = this.ctx as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.translate(x, y);
    }

    private translate(x: number, y: number) {
        const ctx = this.ctx as CanvasRenderingContext2D;
        ctx.beginPath();
        ctx.translate(x, y);
        this.translation = {
            x: this.translation.x + x, 
            y: this.translation.y + y, 
        };        
    }

    zoom(zoom: number) {
        this.settings.scaleX = zoom;
        this.settings.scaleY = zoom;
    }

    showGrid(toggle: boolean) {
        this.showGridX(toggle);
        this.showGridY(toggle);
    }

    showGridX(toggle: boolean) {
        this.settings.showGridX = toggle;
    }
    
    showGridY(toggle: boolean) {
        this.settings.showGridY = toggle;
    }

    getNashInfo(): string{
        return `Canvas width: ${this.cnv?.width} \n Canvas height: ${this.cnv?.height}`;
    }
}