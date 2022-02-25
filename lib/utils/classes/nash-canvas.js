"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_settings_1 = require("../../config/canvas/canvas-settings");
var canvas_utils_1 = require("../functions/canvas-utils");
var NashCanvas = /** @class */ (function () {
    function NashCanvas(opt, canvas) {
        this.canvas = canvas ? canvas : document.createElement("canvas");
        if (!canvas && (opt === null || opt === void 0 ? void 0 : opt.id))
            this.canvas.setAttribute('id', opt === null || opt === void 0 ? void 0 : opt.id);
        this.options = {
            id: (opt === null || opt === void 0 ? void 0 : opt.id) || canvas_settings_1.canvasDefaultSettings.id,
            contextType: (opt === null || opt === void 0 ? void 0 : opt.contextType) || canvas_settings_1.canvasDefaultSettings.contextType,
            bgColor: (opt === null || opt === void 0 ? void 0 : opt.bgColor) || canvas_settings_1.canvasDefaultSettings.bgColor,
            mainColor: (opt === null || opt === void 0 ? void 0 : opt.mainColor) || canvas_settings_1.canvasDefaultSettings.mainColor,
            mainColorAlpha: (opt === null || opt === void 0 ? void 0 : opt.mainColor) || canvas_settings_1.canvasDefaultSettings.mainColorAlpha,
            primaryColor: (opt === null || opt === void 0 ? void 0 : opt.primaryColor) || canvas_settings_1.canvasDefaultSettings.primaryColor,
            secondaryColor: (opt === null || opt === void 0 ? void 0 : opt.secondaryColor) || canvas_settings_1.canvasDefaultSettings.secondaryColor,
            infoColor: (opt === null || opt === void 0 ? void 0 : opt.infoColor) || canvas_settings_1.canvasDefaultSettings.infoColor
        };
        this.ctx = this.canvas.getContext((0, canvas_utils_1.getCurrentContext)(this.options));
    }
    return NashCanvas;
}());
exports.default = NashCanvas;
//# sourceMappingURL=nash-canvas.js.map