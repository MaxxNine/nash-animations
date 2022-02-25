"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNumber = exports.getNearHighAndRoundedNumber = void 0;
function getNearHighAndRoundedNumber(num) {
    var rounded = Math.ceil(num);
    var str = "" + rounded;
    var roundedNumber = '1';
    for (var i = 0; i < str.length - 1; i++) {
        roundedNumber += '0';
    }
    return { highValue: (+str), roundedNumber: +roundedNumber };
}
exports.getNearHighAndRoundedNumber = getNearHighAndRoundedNumber;
function isNumber(num) {
    return !isNaN(num) && num !== Infinity;
}
exports.isNumber = isNumber;
//# sourceMappingURL=index.js.map