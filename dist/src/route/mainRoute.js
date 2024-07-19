"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const restrict_1 = __importDefault(require("../middleware/restrict"));
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const applyRoleMiddleware = (role) => (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
        return (0, restrict_1.default)(role)(req, res, next);
    }
    next();
}));
const groupRoutes = (app) => {
    app.use("/api/general", generalRoute_1.default);
    app.use("/api/users", userRoute_1.default);
    app.use("/api/skills", auth_1.default, applyRoleMiddleware("admin"), skillRoute_1.default);
    app.use("/api/testimonials", auth_1.default, applyRoleMiddleware("admin"), testimonialRoute_1.default);
    app.use("/api/resume", auth_1.default, applyRoleMiddleware("admin"), resumeRoute_1.default);
    app.use("/api/portfolio", auth_1.default, applyRoleMiddleware("admin"), portfolioRoutes_1.default);
};
exports.default = groupRoutes;
