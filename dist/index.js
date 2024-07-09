"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("./src/config/mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const mainRoute_1 = __importDefault(require("./src/route/mainRoute"));
dotenv_1.default.config({ path: './.env' });
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Connect to MongoDB
(0, mongoose_1.default)();
// Setup routes
(0, mainRoute_1.default)(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
