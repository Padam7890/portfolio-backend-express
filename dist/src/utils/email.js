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
const nodemailer_1 = __importDefault(require("nodemailer"));
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    level: 'debug',
    format: winston_1.default.format.json(),
    transports: [new winston_1.default.transports.Console()]
});
const sendEmail = (option) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '587'), // Ensure port is parsed as an integer
            secure: false, // Set to true if using secure connection (SSL/TLS)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const emailOptions = {
            from: option.from,
            to: option.to,
            subject: option.subject,
            html: option.html,
        };
        try {
            logger.info(`Sending mail to - ${option.to}`);
            const info = yield transporter.sendMail(emailOptions);
            logger.info(`Email sent: ${info.response}`);
            return "Email Sent Successfully";
        }
        catch (error) {
            logger.error(`Error sending mail - ${error}`);
            throw new Error("Error sending email");
        }
    }
    catch (error) {
        logger.error(`Error creating transporter - ${error}`);
        throw new Error("Error creating transporter");
    }
});
exports.default = sendEmail;
