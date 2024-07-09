"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.Blog = exports.Portfolio = exports.Category = exports.SkillsPercentage = exports.EducationExperience = exports.Client = exports.Testimonial = exports.Skill = exports.User = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// User Schema
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    positions: { type: [String], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    passwordChangedAt: {
        type: Date,
        default: null,
    },
    passwordResetToken: {
        type: String,
        default: null,
    },
    passwordResetTokenExpire: {
        type: Date,
        default: null,
    },
    birthday: { type: Date, required: true },
    location: { type: String, required: true },
    aboutMe: { type: String, required: true },
    facebookUrl: { type: String },
    instagramUrl: { type: String },
    linkedinUrl: { type: String },
    profileImage: { type: String, required: true },
});
// Skills Schema
const SkillsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    descriptions: { type: String, required: true },
    image: { type: String, required: true },
});
// Testimonials Schema
const TestimonialsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    descriptions: { type: String, required: true },
    photo: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Clients Schema
const ClientsSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
});
// Education/Experience Schema
const EducationExperienceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    dateFrom: { type: Date, required: true },
    dateTo: { type: Date, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["education", "experience"], required: true },
});
// Skills Percentage Schema
const SkillsPercentageSchema = new mongoose_1.Schema({
    title: { type: String, required: true, unique: true },
    percentage: { type: Number, required: true },
    portfolios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Portfolio'
        }]
});
const categorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    portfolios: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Portfolio',
        }],
});
// Portfolio Schema
const PortfolioSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    image: { type: String, required: true },
    url: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});
// Blog Schema
const BlogSchema = new mongoose_1.Schema({
    categoryName: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
// Contact Schema
const ContactSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true },
    emailAddress: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
// Models
exports.User = mongoose_1.default.model("User", UserSchema);
exports.Skill = mongoose_1.default.model("Skill", SkillsSchema);
exports.Testimonial = mongoose_1.default.model("Testimonial", TestimonialsSchema);
exports.Client = mongoose_1.default.model("Client", ClientsSchema);
exports.EducationExperience = mongoose_1.default.model("EducationExperience", EducationExperienceSchema);
exports.SkillsPercentage = mongoose_1.default.model("SkillsPercentage", SkillsPercentageSchema);
exports.Category = mongoose_1.default.model("Category", categorySchema);
exports.Portfolio = mongoose_1.default.model("Portfolio", PortfolioSchema);
exports.Blog = mongoose_1.default.model("Blog", BlogSchema);
exports.Contact = mongoose_1.default.model("Contact", ContactSchema);
