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
const models_1 = require("../../models/models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
const loginUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        console.log('Email:', email);
        // Find the user by email
        const user = yield models_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email" });
        }
        // Compare provided password with the hashed password in the database
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }
        // Generate JWT token without expiration
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET);
        // Return response with token and user details
        return res.json({
            message: "Logged in successfully",
            accessToken: token,
            key: process.env.JWT_SECRET,
            user: { _id: user._id, name: user.name, email: user.email },
        });
    }
    catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ msg: "Server Error" });
    }
}));
exports.default = loginUser;
