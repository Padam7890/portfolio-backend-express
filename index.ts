import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./src/config/mongoose";
import dotenv from "dotenv";
import groupRoutes from "./src/route/mainRoute";
import { User } from "./src/models/models";
import bcrypt from "bcryptjs"
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const app: Express = express();

dotenv.config();


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*",
  credentials: true,
}));




// Connect to MongoDB
connectDB();



// Setup routes
groupRoutes(app);

// Nodemailer Setup
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Route to request password reset
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  console.log(email)

  try {
    const user = await User.findOne({ email });
    const getUser = await User.find();
    // console.log(getUser)
    if (!user) {
      return res.status(400).json({ msg: 'User with this email does not exist.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = resetToken;
    user.passwordResetTokenExpire = new Date(Date.now() + 3600000); // 1 hour

    await user.save();

    // Send email
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to reset the password for your account.\n\n
      Please click on the following link, or paste it into your browser to complete the process:\n\n
      ${resetUrl}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.`
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: 'Password reset link sent to your email address.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

// Route to reset password
app.post('/api/auth/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      passwordResetToken: token,
      passwordResetTokenExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Password reset token is invalid or has expired.' });
    }

   
    // Hash the new password
    user.password = await bcrypt.hash(password, 10);
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpire = undefined;


    await user.save();

    res.json({ msg: 'Password has been reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
