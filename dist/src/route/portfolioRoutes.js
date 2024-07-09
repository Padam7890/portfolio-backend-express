"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_controller_1 = __importDefault(require("../controllers/portfolioController/create.controller"));
const upload_1 = __importDefault(require("../middleware/upload"));
const cloudsave_1 = __importDefault(require("../middleware/cloudsave"));
const index_controller_1 = require("../controllers/portfolioController/index.controller");
const router = (0, express_1.Router)();
router.post('/', upload_1.default.single('image'), cloudsave_1.default, create_controller_1.default);
router.get('/all', index_controller_1.getPortfolio);
router.get('/category', index_controller_1.getCategory);
router.get('/', index_controller_1.getPortfolioByCategory);
exports.default = router;
