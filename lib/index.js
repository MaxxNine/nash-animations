"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var canvas_enum_1 = require("./enums/canvas.enum");
var presets_1 = __importDefault(require("./presets"));
var NashAnimations = /** @class */ (function () {
    function NashAnimations(ct, type) {
        this.container = ct || document.getElementById("nash-animations");
        this.nashCanvas = presets_1.default[type || canvas_enum_1.EContextTypes.BIDIMENSIONAL]();
        this.models = [];
        this.init();
    }
    NashAnimations.prototype.init = function () {
        try {
            console.log("Welcome to Nash Animation");
            this.nashCanvas.canvas.style.backgroundColor = this.nashCanvas.options.bgColor;
            this.container.appendChild(this.nashCanvas.canvas);
        }
        catch (error) {
            console.error("You should add a div with #nash-animations");
        }
    };
    NashAnimations.prototype.start = function () {
        requestAnimationFrame(this.animating.bind(this));
    };
    NashAnimations.prototype.add = function (model) {
        model.add(this.nashCanvas);
        this.models.push(model);
    };
    NashAnimations.prototype.resize = function (w, h) {
        this.nashCanvas.canvas.width = w;
        this.nashCanvas.canvas.height = h;
    };
    NashAnimations.prototype.clearRect = function () {
        var ctx = this.nashCanvas.ctx;
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        // Will always clear the right space
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.restore();
    };
    NashAnimations.prototype.animating = function () {
        this.clearRect();
        for (var _i = 0, _a = this.models; _i < _a.length; _i++) {
            var model = _a[_i];
            model.animate();
        }
        requestAnimationFrame(this.animating.bind(this));
    };
    return NashAnimations;
}());
exports.default = NashAnimations;
//# sourceMappingURL=index.js.map