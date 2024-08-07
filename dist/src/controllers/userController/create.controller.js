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
const passwordhash_1 = __importDefault(require("../../utils/passwordhash"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
// Function to create or fetch a role
const createOrFetchRole = (roleName) => __awaiter(void 0, void 0, void 0, function* () {
    let role = yield models_1.Role.findOne({ name: roleName });
    if (!role) {
        role = new models_1.Role({ name: roleName });
        yield role.save();
    }
    return role._id;
});
const createUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, positions, email, phone, location, password, birthday, aboutMe, facebookUrl, instagramUrl, linkedinUrl, roles, // Expecting array of role names
         } = req.body;
        const profileImage = req.cloudinaryUrl;
        console.log(profileImage); // Assumed to be set elsewhere
        console.log(req.body);
        // Check if the email already exists
        const existingUser = yield models_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        // Hash the password
        const hashedPassword = yield (0, passwordhash_1.default)(password);
        // Ensure roles is an array, handle if it's a comma-separated string
        const roleArray = yield (createOrFetchRole(roles));
        // Create a new user
        const user = new models_1.User({
            name,
            positions,
            email,
            phone,
            location,
            password: hashedPassword,
            birthday,
            aboutMe,
            facebookUrl,
            instagramUrl,
            linkedinUrl,
            profileImage,
            roles: roleArray, // Assign role IDs to the user
        });
        yield user.save();
        // Sign in with JWT token
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({
            message: "User created successfully",
            data: user,
            accessToken,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message,
        });
    }
}));
exports.default = createUser;
