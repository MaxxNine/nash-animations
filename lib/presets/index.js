"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bidimensional_1 = __importDefault(require("./bidimensional"));
var tridimensional_1 = __importDefault(require("./tridimensional"));
exports.default = {
    bidimensional: function () {
        return new bidimensional_1.default();
    },
    tridimensional: function () {
        return new tridimensional_1.default();
    },
};
//# sourceMappingURL=index.js.map