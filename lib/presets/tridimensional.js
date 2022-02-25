"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var nash_canvas_1 = __importDefault(require("../utils/classes/nash-canvas"));
var Tridimensional = /** @class */ (function (_super) {
    __extends(Tridimensional, _super);
    function Tridimensional() {
        var _this = _super.call(this, { id: 'nash-3d-canvas', contextType: 'tridimensional' }) || this;
        _this.init();
        return _this;
    }
    Tridimensional.prototype.init = function () {
    };
    return Tridimensional;
}(nash_canvas_1.default));
exports.default = Tridimensional;
//# sourceMappingURL=tridimensional.js.map