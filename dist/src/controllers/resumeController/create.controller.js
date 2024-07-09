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
const resumeSave = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, dateFrom, dateTo, type, description } = req.body;
        const dateFromConvert = dateTo ? new Date(dateTo) : null;
        const dateToConvert = dateFrom ? new Date(dateFrom) : null;
        if (type !== "education" && type !== "experience") {
            return res.status(400).json({ message: "Invalid type" });
        }
        const saveResume = new models_1.EducationExperience({
            title,
            dateFrom: dateFromConvert,
            dateTo: dateToConvert,
            description,
            type,
        });
        const savedResume = yield saveResume.save();
        return res.status(200).json({
            msg: "Resume saved successfully",
            data: savedResume,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error", error: error });
    }
}));
exports.default = resumeSave;
