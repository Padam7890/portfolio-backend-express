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
const { Testimonial } = require("../../models/models");
const updateTestimonials = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, descriptions } = req.body;
        const photo = req.cloudinaryUrl;
        const update = {};
        if (name)
            update.name = name;
        if (descriptions)
            update.descriptions = descriptions;
        if (photo)
            update.photo = photo;
        const testimonials = Testimonial.findByIdAndUpdate(id, update, {
            new: true,
        });
        if (!testimonials) {
            return res.status(404).json({
                msg: "testimonials not found",
            });
        }
        return res.status(200).json({
            msg: "testimonials Updated successfully",
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error,
        });
    }
}));
exports.default = updateTestimonials;
