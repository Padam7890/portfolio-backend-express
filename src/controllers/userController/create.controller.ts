import { Response } from "express";
import CustomRequest from "../../config/customRequest";
import { Role, User } from "../../models/models";
import hashPassword from "../../utils/passwordhash";
import jwt from "jsonwebtoken";
import asyncHandler from "../../middleware/asyncHandler";

// Function to create or fetch a role
const createOrFetchRole = async (roleName: string) => {
  let role = await Role.findOne({ name: roleName });
  if (!role) {
    role = new Role({ name: roleName });
    await role.save();
  }
  return role._id;
};

const createUser = asyncHandler(async (req: CustomRequest, res: Response) => {
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
      roles, // Expecting array of role names
    } = req.body;

    const profileImage = req.cloudinaryUrl;
    console.log(profileImage) // Assumed to be set elsewhere

    console.log(req.body);

    // Check if the email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

       // Ensure roles is an array, handle if it's a comma-separated string
  const roleArray=   await(createOrFetchRole(roles))
   

    // Create a new user
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
      roles: roleArray, // Assign role IDs to the user
    });

    await user.save();

    // Sign in with JWT token
    const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '1d' });

    return res.status(201).json({
      message: "User created successfully",
      data: user,
      accessToken,
    });
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
});

export default createUser;
