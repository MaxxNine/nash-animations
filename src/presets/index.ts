import Bidimensional from "./bidimensional";
import Tridimensional from "./tridimensional";

export default { 
    bidimensional: (): Bidimensional => {
        return new Bidimensional();
    },
    tridimensional: (): Tridimensional => {
        return new Tridimensional();
    },
}