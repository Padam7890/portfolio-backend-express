const { User } = require("../../models/models");
const { hashPassword } = require("../../utils/passwordhash");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    const {
      name,
      positions,
      email,
      phone,
      location,
      password,
      birthday,
      aboutMe,
      facebookUrl,
      instagramUrl,
      linkedinUrl,
    } = req.body;

    const profileImage = req.cloudinaryUrl;

    console.log(profileImage);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    //paswword has

    const user = new User({
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
    });

    await user.save();

    //sign in with jwt token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
      accessToken: accessToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = createUser;
