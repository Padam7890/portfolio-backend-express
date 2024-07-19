import asyncHandler from "../../middleware/asyncHandler";

// Import necessary modules
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { User } = require('./models/User'); // Adjust the path as necessary

// Route to request password reset
const requestPasswordReset = asyncHandler(async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "No user with this email" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email provider's service
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset',
      text: `You requested a password reset. Please click on the following link to reset your password: 
        http://${req.headers.host}/reset-password/${resetToken}
        If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = requestPasswordReset;