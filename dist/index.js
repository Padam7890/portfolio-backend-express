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
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app = (0, express_1.default)();
dotenv_1.default.config();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
    credentials: true,
}));
// Connect to MongoDB
(0, mongoose_1.default)();
// Setup routes
(0, mainRoute_1.default)(app);
// // Nodemailer Setup
// let transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: parseInt(process.env.EMAIL_PORT || '587'),
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASSWORD,
//   },
// });
// // Route to request password reset
// app.post('/api/auth/forgot-password', async (req, res) => {
//   const { email } = req.body;
//   console.log(email)
//   try {
//     const user = await User.findOne({ email });
//     const getUser = await User.find();
//     // console.log(getUser)
//     if (!user) {
//       return res.status(400).json({ msg: 'User with this email does not exist.' });
//     }
//     // Generate reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');
//     user.passwordResetToken = resetToken;
//     user.passwordResetTokenExpire = new Date(Date.now() + 3600000); // 1 hour
//     await user.save();
//     // Send email
//     const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
//     const mailOptions = {
//       to: user.email,
//       from: process.env.EMAIL_USER,
//       subject: 'Password Reset',
//       text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n
//       Please click on the following link, or paste it into your browser to complete the process:\n\n
//       ${resetUrl}\n\n
//       If you did not request this, please ignore this email and your password will remain unchanged.`
//     };
//     await transporter.sendMail(mailOptions);
//     res.json({ msg: 'Password reset link sent to your email address.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });
// // Route to reset password
// app.post('/api/auth/reset-password', async (req, res) => {
//   const { token, password } = req.body;
//   try {
//     const user = await User.findOne({
//       passwordResetToken: token,
//       passwordResetTokenExpire: { $gt: Date.now() }
//     });
//     if (!user) {
//       return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
//     }
//     // Hash the new password
//     user.password = await bcrypt.hash(password, 10);
//     user.passwordResetToken = undefined;
//     user.passwordResetTokenExpire = undefined;
//     await user.save();
//     res.json({ msg: 'Password has been reset successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: 'Server Error' });
//   }
// });
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
