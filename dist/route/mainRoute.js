"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const groupRoutes = (app) => {
    app.use('/api/users', userRoute_1.default);
};
exports.default = groupRoutes;
