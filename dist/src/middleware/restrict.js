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
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const models_1 = require("../models/models");
const checkRole = (requiredRole) => {
    return (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure req.user is defined and has a roles property
        if (req.user && req.user.roles) {
            console.log("User Roles:", req.user.roles);
            // Find the role in the database
            const getRole = yield models_1.Role.findById(req.user.roles);
            if (getRole && getRole.name === requiredRole) {
                return next();
            }
            else {
                return res.status(403).json({ msg: "Access denied" });
            }
        }
        else {
            return res.status(403).json({ msg: "Access denied" });
        }
    }));
};
exports.default = checkRole;
