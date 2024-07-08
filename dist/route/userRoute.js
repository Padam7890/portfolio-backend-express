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
router.post('/', upload_1.default.single('profileImage'), (req, res, next) => (0, cloudsave_1.default)(req, res, next), (req, res) => (0, create_controller_1.default)(req, res));
router.post('/login', (req, res) => (0, login_controller_1.default)(req, res));
router.get('/user', (req, res) => (0, userDetails_controller_1.default)(req, res));
exports.default = router;
