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

const checkAuth = asyncHandler ( async (req:CustomRequest, res, next)=> {
  let token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: "Not Logged in" });
  }

  try {
    token = token.split(" ")[1];

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as DecodedToken;

    // Fetch the user from the database
    const currentUser = await User.findOne({
      where: { id: decoded.id },
    });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = currentUser;

    next();
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(401).json({ message: "Invalid token" });
  }
});

export default checkAuth;
