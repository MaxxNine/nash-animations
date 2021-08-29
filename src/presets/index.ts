import Board from "./board";
import Cartesian from "./cartesian";
import Complex from "./complex";
import Polar from "./polar";
import Webgl from "./webgl";

export default { 
    cartesian: (context: RenderingContext | null): Cartesian => {
        return new Cartesian(context as CanvasRenderingContext2D);
    },
    board: (context: RenderingContext | null): Board => {
        return new Board(context as CanvasRenderingContext2D);
    },
    polar: (context: RenderingContext | null): Polar => {
        return new Polar(context as CanvasRenderingContext2D);
    },
    complex: (context: RenderingContext | null): Polar => {
        return new Complex(context as CanvasRenderingContext2D);
    },
    webgl: (context: RenderingContext | null): Webgl => {
        return new Webgl(context as WebGL2RenderingContext);
    },
}