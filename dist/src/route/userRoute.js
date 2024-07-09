"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload_1 = __importDefault(require("../middleware/upload"));
const cloudsave_1 = __importDefault(require("../middleware/cloudsave"));
const create_controller_1 = __importDefault(require("../controllers/userController/create.controller"));
const login_controller_1 = __importDefault(require("../controllers/userController/login.controller"));
const userDetails_controller_1 = __importDefault(require("../controllers/userController/userDetails.controller"));
const router = express_1.default.Router();
router.post('/', upload_1.default.single('profileImage'), cloudsave_1.default, create_controller_1.default);
router.post('/login', login_controller_1.default);
router.get('/user', userDetails_controller_1.default);
exports.default = router;
