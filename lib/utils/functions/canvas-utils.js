"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentContext = void 0;
var canvas_enum_1 = require("../../enums/canvas.enum");
var getCurrentContext = function (options) {
    if (options.contextType === canvas_enum_1.EContextTypes.TRIDIMENSIONAL)
        return 'webgl';
    return '2d';
};
exports.getCurrentContext = getCurrentContext;
//# sourceMappingURL=canvas-utils.js.map