import { parser }from 'mathjs';


export const solveFunction =  (exp: string, values: number[], density: number, incog = 1): number[] => {
    let results: number[] = [];
    const p = parser();
    p.evaluate(`f(x) = ${exp}`);
    for (let i = values[0]; i <= values[1]; i+=density) {
        try{
            let solution = p.evaluate(`f(${i})`);    
            results.push(solution);
             
        } catch (e) {
            throw Error("Please insert a valid expression");
        }
    }
    return results;
}