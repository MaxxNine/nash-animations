import Board from "./board";
import Cartesian from "./cartesian";
import Complex from "./complex";
import Polar from "./polar";
import Webgl from "./webgl";

export default { 
    cartesian: (context: RenderingContext | null): Cartesian => {
        return new Cartesian(context);
    },
    board: (context: RenderingContext | null): Board => {
        return new Board(context);
    },
    polar: (context: RenderingContext | null): Polar => {
        return new Polar(context);
    },
    complex: (context: RenderingContext | null): Polar => {
        return new Complex(context);
    },
    webgl: (context: RenderingContext | null): Webgl => {
        return new Webgl(context);
    },
}