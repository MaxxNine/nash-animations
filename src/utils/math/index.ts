export function getNearHighAndRoundedNumber(num: number) {
    const rounded = Math.ceil(num);
    let str = "" + rounded;
    let roundedNumber = '1';
    for (let i = 0; i < str.length-1; i++) {
        roundedNumber+='0';
    }   
    return { highValue: (+str), roundedNumber: +roundedNumber} ;
}

export function isNumber(num: number): boolean {
    return !isNaN(num) && num !== Infinity; 
}