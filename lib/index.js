"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var canvasSettings_1 = require("@config/canvasSettings");
var presets_1 = __importDefault(require("./presets"));
var canvas_enum_1 = require("@enums/canvas.enum");
var NashCanvas = /** @class */ (function () {
    function NashCanvas(options) {
        this.container = document.getElementById("nash-animations");
        this.canvas = document.createElement("canvas");
        this.options = {
            type: (options === null || options === void 0 ? void 0 : options.type) || canvasSettings_1.defaultOptions.type,
            bgColor: (options === null || options === void 0 ? void 0 : options.bgColor) || canvasSettings_1.defaultOptions.bgColor,
            mainColor: (options === null || options === void 0 ? void 0 : options.mainColor) || canvasSettings_1.defaultOptions.mainColor,
            primaryColor: (options === null || options === void 0 ? void 0 : options.primaryColor) || canvasSettings_1.defaultOptions.primaryColor,
            secondaryColor: (options === null || options === void 0 ? void 0 : options.secondaryColor) || canvasSettings_1.defaultOptions.secondaryColor,
            infoColor: (options === null || options === void 0 ? void 0 : options.infoColor) || canvasSettings_1.defaultOptions.infoColor
        };
        this.context = this.canvas.getContext(this.getCurrentContext());
        this.init();
    }
    NashCanvas.prototype.init = function () {
        this.canvas.style.backgroundColor = this.options.bgColor;
        this.mode = presets_1.default[this.options.type](this.context);
        this.mode.drawAxis(12);
        this.container.appendChild(this.canvas);
    };
    NashCanvas.prototype.getCurrentContext = function () {
        if (this.options.type === canvas_enum_1.ECanvasTypes.WEBGL)
            return 'webgl';
        return '2d';
    };
    return NashCanvas;
}());
exports.default = NashCanvas;
//# sourceMappingURL=index.js.map