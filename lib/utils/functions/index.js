"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveFunction = void 0;
var mathjs_1 = require("mathjs");
var solveFunction = function (exp, values, density, incog) {
    if (incog === void 0) { incog = 1; }
    var results = [];
    var p = (0, mathjs_1.parser)();
    p.evaluate("f(x) = ".concat(exp));
    for (var i = values[0]; i <= values[1]; i += density) {
        try {
            var solution = p.evaluate("f(".concat(i, ")"));
            results.push(solution);
        }
        catch (e) {
            throw Error("Please insert a valid expression");
        }
    }
    return results;
};
exports.solveFunction = solveFunction;
//# sourceMappingURL=index.js.map