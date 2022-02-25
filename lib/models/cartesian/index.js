"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./../../utils/functions/index");
var canvas_settings_1 = require("./../../config/canvas/canvas-settings");
var cartesian_settings_1 = require("./cartesian-settings");
var math_1 = require("./../../utils/math");
var Cartesian = /** @class */ (function () {
    function Cartesian() {
        // CONSTANTS
        this.GRID_SIZE = 25;
        this.settings = cartesian_settings_1.cartesianDefaultSettings;
        this.cnvSettings = canvas_settings_1.canvasDefaultSettings;
        this.isAnimating = false;
        this.isAnimatingReverse = false;
        this.grid_size_x = 0;
        this.grid_size_y = 0;
        this.num_lines_x = 0;
        this.num_lines_y = 0;
        this.width = 0;
        this.height = 0;
        this.currentWidth = 0;
        this.currentHeight = 0;
        this.animationDuration = 0;
        this.graphs = [];
        this.translation = { x: 0, y: 0 };
    }
    Cartesian.prototype.add = function (nashCanvas) {
        this.cnv = nashCanvas.canvas;
        this.ctx = nashCanvas.ctx;
        this.cnvSettings = nashCanvas.options;
    };
    Cartesian.prototype.draw2D = function (width, height, seconds) {
        if (seconds === void 0) { seconds = 2; }
        // SETUP
        var cnv = this.cnv;
        var ctx = this.ctx;
        var oX = this.settings.originX;
        var oY = this.settings.originY;
        var s = this.settings;
        this.width = width * cnv.width;
        this.height = height * cnv.height;
        this.grid_size_x = this.GRID_SIZE * s.scaleY;
        this.grid_size_y = this.GRID_SIZE * s.scaleX;
        this.num_lines_x = Math.floor(this.height / this.grid_size_y);
        this.num_lines_y = Math.floor(this.width / this.grid_size_x);
        this.settings.originX = oX === -1 ? Math.floor(this.num_lines_x / 2) : oX;
        this.settings.originY = oY === -1 ? Math.floor(this.num_lines_y / 2) : oY;
        this.label_x = { number: 1 * s.densityX, suffix: '' };
        this.label_y = { number: 1 * s.densityY, suffix: '' };
        this.animationDuration = seconds;
        this.isAnimating = true;
    };
    Cartesian.prototype.addGraph2D = function (exp, interval) {
        this.graphs.push({ exp: exp, interval: interval });
    };
    Cartesian.prototype.plotGraph2D = function (exp, interval) {
        var density = 0.01;
        var results = (0, index_1.solveFunction)(exp, interval, density);
        var _a = [Math.min.apply(Math, results), Math.max.apply(Math, results)], yMin = _a[0], yMax = _a[1];
        var xMin = interval[0], xMax = interval[1];
        var ctx = this.ctx;
        var _b = (0, math_1.getNearHighAndRoundedNumber)(yMax), highValue = _b.highValue, roundedNumber = _b.roundedNumber;
        this.settings.densityY = (this.height) / (Math.abs(highValue * 2));
        this.settings.densityX = (this.width) / Math.abs((interval[1] - interval[0]) / density);
        this.num_lines_y = Math.ceil(xMax - xMin);
        this.num_lines_x = Math.ceil(xMax - xMin);
        this.settings.originX = Math.floor(this.num_lines_x / 2);
        this.settings.originY = Math.floor(this.num_lines_y / 2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.cnvSettings.primaryColor;
        ctx.beginPath();
        for (var i = 0; i < results.length; i++) {
            var y = 0;
            y = y - (results[i] * this.settings.densityY);
            var x = (xMin * this.grid_size_x) + (this.settings.densityX) * i;
            if (i == 0)
                ctx.moveTo(x, y);
            else if (!(0, math_1.isNumber)(results[i - 1])
                || (results[i - 1] < 0 && results[i] > 0)
                || (results[i - 1] > 0 && results[i] < 0)) {
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x, y);
            }
            else if ((0, math_1.isNumber)(results[i]))
                ctx.lineTo(x, y);
        }
        ctx.stroke();
    };
    Cartesian.prototype.animate = function () {
        var ctx = this.ctx;
        var showX = this.settings.showGridX;
        var showY = this.settings.showGridY;
        var x_origin = this.settings.originX;
        var y_origin = this.settings.originY;
        this.grid_size_y = this.height / this.num_lines_x;
        this.grid_size_x = this.width / this.num_lines_y;
        this.drawX(ctx, showX, this.grid_size_y, x_origin, this.label_x, this.num_lines_x, this.currentWidth * this.width);
        this.drawY(ctx, showY, this.grid_size_x, y_origin, this.label_y, this.num_lines_y, this.currentHeight * this.height);
        ctx.save();
        this.centerOrigin();
        this.drawXTicks();
        this.drawYTicks();
        ctx.restore();
        if (this.isAnimating) {
            this.currentWidth += (1 / (this.animationDuration * 60));
            this.currentHeight += (1 / (this.animationDuration * 60));
        }
        else {
            for (var _i = 0, _a = this.graphs; _i < _a.length; _i++) {
                var v = _a[_i];
                ctx.save();
                this.centerOrigin();
                this.plotGraph2D(v.exp, v.interval);
                ctx.restore();
            }
        }
        if (this.currentWidth > 1 && this.currentHeight > 1) {
            this.isAnimating = false;
        }
    };
    Cartesian.prototype.drawX = function (ctx, show_grid, grid_size, origin, label, num_lines, width) {
        var start = show_grid ? 0 : origin;
        var end = show_grid ? num_lines : origin;
        for (var i = start; i <= end; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (i === origin)
                ctx.strokeStyle = this.cnvSettings.mainColor;
            else
                ctx.strokeStyle = this.cnvSettings.mainColorAlpha;
            if (i === end) {
                ctx.moveTo(-this.translation.x, grid_size * i);
                ctx.lineTo(width - this.translation.x, grid_size * i);
            }
            else {
                ctx.moveTo(-this.translation.x, (grid_size * i) + 0.5);
                ctx.lineTo(width - this.translation.x, (grid_size * i) + 0.5);
            }
            ctx.stroke();
        }
    };
    Cartesian.prototype.drawY = function (ctx, show_grid, grid_size, origin, label, num_lines, height) {
        var start = show_grid ? 0 : origin;
        var end = show_grid ? num_lines : origin;
        for (var i = start; i <= end; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            if (i === origin)
                ctx.strokeStyle = this.cnvSettings.mainColor;
            else
                ctx.strokeStyle = this.cnvSettings.mainColorAlpha;
            if (i === end) {
                ctx.moveTo(grid_size * i, -this.translation.y);
                ctx.lineTo(grid_size * i, height - this.translation.y);
            }
            else {
                ctx.moveTo((grid_size * i) + 0.5, -this.translation.y);
                ctx.lineTo((grid_size * i) + 0.5, height - this.translation.y);
            }
            ctx.stroke();
        }
    };
    Cartesian.prototype.drawXTicks = function () {
        var ctx = this.ctx;
        var oY = this.settings.originY;
        // Ticks marks along the positive X-axis
        for (var i = 1; i < (this.num_lines_y - oY); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor;
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(this.grid_size_x * i + 0.5, -3);
            ctx.lineTo(this.grid_size_x * i + 0.5, 3);
            ctx.stroke();
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillStyle = this.cnvSettings.mainColor;
            ctx.fillText(this.label_x.number * i + this.label_x.suffix, this.grid_size_x * i - 2, 15);
        }
        // Ticks marks along the negative X-axis
        for (var i = 1; i < oY; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor;
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-this.grid_size_x * i + 0.5, -3);
            ctx.lineTo(-this.grid_size_x * i + 0.5, 3);
            ctx.stroke();
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-this.label_x.number * i + this.label_x.suffix, -this.grid_size_x * i + 3, 15);
        }
    };
    Cartesian.prototype.drawYTicks = function () {
        var ctx = this.ctx;
        var oX = this.settings.originX;
        // Ticks marks along the positive Y-axis
        for (var i = 1; i < (this.num_lines_x - oX); i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor;
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, this.grid_size_y * i + 0.5);
            ctx.lineTo(3, this.grid_size_y * i + 0.5);
            ctx.stroke();
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'start';
            ctx.fillStyle = this.cnvSettings.mainColor;
            ctx.fillText(this.label_y.number * i + this.label_y.suffix, 15, this.grid_size_y * i + 3);
        }
        // Ticks marks along the negative Y-axis
        for (var i = 1; i < oX; i++) {
            ctx.beginPath();
            ctx.lineWidth = 1;
            ctx.strokeStyle = this.cnvSettings.mainColor;
            // Draw a tick mark 6px long (-3 to 3)
            ctx.moveTo(-3, -this.grid_size_y * i + 0.5);
            ctx.lineTo(3, -this.grid_size_y * i + 0.5);
            ctx.stroke();
            // Text value at that point
            ctx.font = '9px Arial';
            ctx.textAlign = 'end';
            ctx.fillText(-this.label_y.number * i + this.label_y.suffix, 15, -this.grid_size_y * i + 3);
        }
    };
    Cartesian.prototype.setSettings = function (options) {
        this.settings = __assign(__assign({}, this.settings), options);
    };
    Cartesian.prototype.centerOrigin = function () {
        var oX = this.settings.originX;
        var oY = this.settings.originY;
        this.setOrigin(oY * this.grid_size_x, oX * this.grid_size_y);
    };
    Cartesian.prototype.setOrigin = function (x, y) {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.translate(x, y);
    };
    Cartesian.prototype.translate = function (x, y) {
        var ctx = this.ctx;
        ctx.beginPath();
        ctx.translate(x, y);
        this.translation = {
            x: this.translation.x + x,
            y: this.translation.y + y,
        };
    };
    Cartesian.prototype.zoom = function (zoom) {
        this.settings.scaleX = zoom;
        this.settings.scaleY = zoom;
    };
    Cartesian.prototype.showGrid = function (toggle) {
        this.showGridX(toggle);
        this.showGridY(toggle);
    };
    Cartesian.prototype.showGridX = function (toggle) {
        this.settings.showGridX = toggle;
    };
    Cartesian.prototype.showGridY = function (toggle) {
        this.settings.showGridY = toggle;
    };
    Cartesian.prototype.getNashInfo = function () {
        var _a, _b;
        return "Canvas width: ".concat((_a = this.cnv) === null || _a === void 0 ? void 0 : _a.width, " \n Canvas height: ").concat((_b = this.cnv) === null || _b === void 0 ? void 0 : _b.height);
    };
    return Cartesian;
}());
exports.default = Cartesian;
//# sourceMappingURL=index.js.map