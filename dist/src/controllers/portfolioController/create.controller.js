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
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
const models_1 = require("../../models/models");
const createPortfolio = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, subtitle, url, category } = req.body;
        const image = req.cloudinaryUrl;
        // Find the category or create a new one if it doesn't exist
        let categoryDocument = yield models_1.Category.findOne({ name: category });
        if (!categoryDocument) {
            categoryDocument = new models_1.Category({ name: category });
            yield categoryDocument.save();
        }
        // Create a new portfolio
        const portfolio = new models_1.Portfolio({
            title,
            subtitle,
            url,
            image,
            category: categoryDocument._id,
        });
        yield portfolio.save();
        // Update the category to reference this portfolio
        if (!categoryDocument.portfolios.includes(portfolio._id)) {
            categoryDocument.portfolios.push(portfolio._id);
            yield categoryDocument.save();
        }
        res.status(201).json({
            message: "Portfolio and category created successfully",
            portfolio,
            category: categoryDocument,
        });
    }
    catch (error) {
        console.error("Error creating portfolio or category", error);
        res.status(500).json({
            message: "Error creating portfolio or category",
            error: error.message,
        });
    }
}));
exports.default = createPortfolio;
