"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = __importDefault(require("./board"));
var cartesian_1 = __importDefault(require("./cartesian"));
var complex_1 = __importDefault(require("./complex"));
var polar_1 = __importDefault(require("./polar"));
var webgl_1 = __importDefault(require("./webgl"));
exports.default = {
    cartesian: function (context) {
        return new cartesian_1.default(context);
    },
    board: function (context) {
        return new board_1.default(context);
    },
    polar: function (context) {
        return new polar_1.default(context);
    },
    complex: function (context) {
        return new complex_1.default(context);
    },
    webgl: function (context) {
        return new webgl_1.default(context);
    },
};
//# sourceMappingURL=index.js.map