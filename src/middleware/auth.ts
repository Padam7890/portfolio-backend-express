import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/models";
import asyncHandler from "./asyncHandler";

interface CustomRequest extends Request {
  user?: any; 
}

interface DecodedToken extends JwtPayload {
  id: string;
}

const checkAuth = asyncHandler(async (req: CustomRequest, res: Response, next: NextFunction) => {
  console.log('Authorization Header:', req.headers.authorization); // Log header to verify

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Not Logged in" });
  }

  if (token.startsWith('Bearer ')) {
    token = token.split(' ')[1];
  } else {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    console.log('Decoded Token:', decoded);

    // Use the decoded id directly as a string
    const currentUser = await User.findOne({ _id: decoded.id });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log('Current User:', currentUser);

    req.user = currentUser;
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default checkAuth;
