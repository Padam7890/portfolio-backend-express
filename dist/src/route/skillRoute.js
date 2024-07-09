"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_controller_1 = __importDefault(require("../controllers/skillsController/delete.controller"));
const index_controller_1 = __importDefault(require("../controllers/skillsController/index.controller"));
const router = (0, express_1.Router)();
router.delete("/:id", delete_controller_1.default);
router.get("/", index_controller_1.default);
exports.default = router;
