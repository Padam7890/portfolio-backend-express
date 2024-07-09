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
const updateResume = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, dateFrom, dateTo, type, description } = req.body;
        const dateFromConvert = dateFrom ? new Date(dateFrom).toISOString() : null;
        const dateToConvert = dateTo ? new Date(dateTo).toISOString() : null;
        const update = {};
        if (title)
            update.title = title;
        if (dateFromConvert)
            update.dateFrom = dateFromConvert;
        if (dateToConvert)
            update.dateTo = dateToConvert;
        if (type)
            update.type = type;
        if (description)
            update.description = description;
        const resume = yield models_1.EducationExperience.findByIdAndUpdate(id, update, { new: true });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found" });
        }
        return res.status(200).json({
            message: "Resume updated successfully",
            data: resume,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}));
exports.default = updateResume;
