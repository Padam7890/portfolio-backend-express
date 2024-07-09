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
const asyncHandler_1 = __importDefault(require("../../middleware/asyncHandler"));
const email_1 = __importDefault(require("../../utils/email"));
const getContact = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, emailAddress, message } = req.body;
        const emailHTML = `
   <h2>New Message Recieved</h2>
   <p><strong>Full Name:</strong> ${fullName}</p>
   <p><strong>Email Address:</strong> ${emailAddress}</p>
   <p><strong>Message:</strong> ${message}</p>
   `;
        try {
            // Send mail successfully
            yield (0, email_1.default)({
                from: emailAddress,
                subject: "New Message Recieved",
                html: emailHTML,
            });
            return res.status(200).json({
                msg: "Thank you for your message"
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ msg: "Failed to send email" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Server Error" });
    }
}));
exports.default = getContact;
