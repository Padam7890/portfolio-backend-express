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
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
const createTestimonials = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, descriptions } = req.body;
        const photo = req.cloudinaryUrl;
        const saveTestimonials = new models_1.Testimonial({
            name,
            descriptions,
            photo,
        });
        yield saveTestimonials.save();
        return res.status(201).json({
            msg: "Testimonials saved successfully",
            data: saveTestimonials,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Server Error",
            error: error,
        });
    }
}));
exports.default = createTestimonials;
