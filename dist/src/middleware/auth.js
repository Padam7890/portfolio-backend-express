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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models/models");
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const checkAuth = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Authorization Header:', req.headers.authorization); // Log header to verify
    let token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Not Logged in" });
    }
    if (token.startsWith('Bearer ')) {
        token = token.split(' ')[1];
    }
    else {
        return res.status(401).json({ message: "Invalid token format" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded);
        // Use the decoded id directly as a string
        const currentUser = yield models_1.User.findOne({ _id: decoded.id });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('Current User:', currentUser);
        req.user = currentUser;
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: "Invalid token" });
    }
}));
exports.default = checkAuth;
