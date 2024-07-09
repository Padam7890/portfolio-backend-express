"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/testimonialsController/index.controller"));
const upload_1 = __importDefault(require("../middleware/upload"));
const cloudsave_1 = __importDefault(require("../middleware/cloudsave"));
const create_controller_1 = __importDefault(require("../controllers/testimonialsController/create.controller"));
const update_controller_1 = __importDefault(require("../controllers/testimonialsController/update.controller"));
const delete_controller_1 = __importDefault(require("../controllers/testimonialsController/delete.controller"));
const router = (0, express_1.Router)();
router.get("/", index_controller_1.default);
router.post("/", upload_1.default.single("photo"), cloudsave_1.default, create_controller_1.default);
router.put("/:id", upload_1.default.single("photo"), cloudsave_1.default, update_controller_1.default);
router.delete("/:id", delete_controller_1.default);
exports.default = router;
