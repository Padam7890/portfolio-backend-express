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
const auth_1 = __importDefault(require("../middleware/auth"));
const groupRoutes = (app) => {
    app.use("/api/general", auth_1.default, generalRoute_1.default);
    app.use('/api/users', userRoute_1.default);
    app.use('/api/skills', auth_1.default, skillRoute_1.default);
    app.use('/api/testimonials', auth_1.default, testimonialRoute_1.default);
    app.use('/api/resume', auth_1.default, resumeRoute_1.default);
    app.use("/api/portfolio", auth_1.default, portfolioRoutes_1.default);
};
exports.default = groupRoutes;
