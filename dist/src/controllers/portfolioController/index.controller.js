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
exports.getPortfolioByCategory = exports.getCategory = exports.getPortfolio = void 0;
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
const models_1 = require("../../models/models");
exports.getPortfolio = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const portfolio = yield models_1.Portfolio.find().populate('category', 'name');
        return res.status(200).json({
            msg: "Portfolio found",
            data: portfolio,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
exports.getCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield models_1.Category.find();
        return res.status(200).json({
            msg: "Category found",
            data: category,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}));
exports.getPortfolioByCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category } = req.query;
        console.log(category);
        let portfolios;
        if (category) {
            // Find category by name
            const categoryObj = yield models_1.Category.findOne({ name: category });
            if (!categoryObj) {
                return res.status(404).json({ message: 'Category not found' });
            }
            // Find portfolios by category ID
            portfolios = yield models_1.Portfolio.find({ category: categoryObj._id }).populate('category', 'name');
        }
        else {
            // No category query parameter, fetch all portfolios
            portfolios = yield models_1.Portfolio.find().populate('category', 'name');
        }
        return res.status(200).json({
            msg: "Portfolios found by category",
            data: portfolios,
        });
    }
    catch (error) {
        console.error("Error fetching portfolios by category", error);
        res.status(500).json({
            message: "Error fetching portfolios by category",
            error: error.message,
        });
    }
}));
