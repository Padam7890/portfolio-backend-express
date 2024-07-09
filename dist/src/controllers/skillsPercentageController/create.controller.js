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
const createSkillPercenatege = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, percentage } = req.body;
        console.log(req.body);
        const saveSkillsPer = new models_1.SkillsPercentage({
            title,
            percentage: parseInt(percentage),
        });
        const dataSave = yield saveSkillsPer.save();
        return res.status(200).json({
            message: "Skills Percentage added successfully",
            data: dataSave,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            error: error,
        });
    }
}));
exports.default = createSkillPercenatege;
