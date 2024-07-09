"use strict";
// import { NextFunction, Request, Response,Router } from "express";
// import resumeSave from "../controllers/resumeController/create.controller";
// import getResume from "../controllers/resumeController/index.controller"
// import updateResume from "../controllers/resumeController/update.controller";
// const router =  Router();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// router.get("/", getResume);
// // router.post('/', resumeSave);
// // router.put('/:id', updateResume)
// export default Router;
const express_1 = require("express");
const index_controller_1 = __importDefault(require("../controllers/resumeController/index.controller"));
const update_controller_1 = __importDefault(require("../controllers/resumeController/update.controller"));
const create_controller_1 = __importDefault(require("../controllers/resumeController/create.controller"));
const router = (0, express_1.Router)();
router.get("/", index_controller_1.default);
router.post('/', create_controller_1.default);
router.put('/:id', update_controller_1.default);
exports.default = router;
