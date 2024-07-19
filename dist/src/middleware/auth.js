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
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmQzZmM0OWE5M2JlNThlODc3MjNmOCIsImlhdCI6MTcyMTM3NTMzN30.id6u1dzWOwVgVxjIDVzSLBeqbfCbRD-Ck4rkmqn6g1A";
    if (!token) {
        return res.status(401).json({ message: "Not Logged in" });
    }
    console.log('JWT Secret:', process.env.JWT_SECRET); // Should output the secret or `undefined` if not set
    // Ensure token is in the format 'Bearer <token>'
    // if (token.startsWith('Bearer ')) {
    //   token = token.split(' ')[1];
    // } else {
    //   return res.status(401).json({ message: "Invalid token format" });
    // }
    try {
        // Verify the JWT token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        // Fetch the user from the database
        const currentUser = yield models_1.User.findOne({
            where: { id: decoded.id },
        });
        if (!currentUser) {
            return res.status(404).json({ message: "User not found" });
        }
        req.user = currentUser;
        console.log(req.user);
        next();
    }
    catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: "Invalid token" });
    }
}));
exports.default = checkAuth;
