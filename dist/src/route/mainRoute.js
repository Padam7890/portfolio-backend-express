"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const skillRoute_1 = __importDefault(require("./skillRoute"));
const testimonialRoute_1 = __importDefault(require("./testimonialRoute"));
const resumeRoute_1 = __importDefault(require("./resumeRoute"));
const portfolioRoutes_1 = __importDefault(require("./portfolioRoutes"));
const generalRoute_1 = __importDefault(require("./generalRoute"));
const groupRoutes = (app) => {
    app.use("/api/general", generalRoute_1.default);
    app.use('/api/users', userRoute_1.default);
    app.use('/api/skills', skillRoute_1.default);
    app.use('/api/testimonials', testimonialRoute_1.default);
    app.use('/api/resume', resumeRoute_1.default);
    app.use("/api/portfolio", portfolioRoutes_1.default);
};
exports.default = groupRoutes;
