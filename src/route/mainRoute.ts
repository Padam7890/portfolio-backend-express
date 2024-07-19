import { Express } from "express"; // Import Express type from express library
import user from"./userRoute";
import skillRoutes from "./skillRoute";
import testimonialsRoutes from "./testimonialRoute";
import resumeRoutes from "./resumeRoute";
import portfolioRoutes from "./portfolioRoutes";
import generalRoute from "./generalRoute";
import checkAuth from "../middleware/auth";
import checkRole from "../middleware/restrict";
import asyncHandler from "../middleware/asyncHandler";

const applyRoleMiddleware = (role: string) => asyncHandler(async(req, res, next) => {
    if (["POST", "PUT", "DELETE"].includes(req.method)) {
      return checkRole(role)(req, res, next);
    }
    next();
  });
  
  const groupRoutes = (app: Express) => {
    app.use("/api/general", generalRoute);
    app.use("/api/users", user);
    app.use("/api/skills", checkAuth, applyRoleMiddleware("admin"), skillRoutes);
    app.use("/api/testimonials", checkAuth, applyRoleMiddleware("admin"), testimonialsRoutes);
    app.use("/api/resume", checkAuth, applyRoleMiddleware("admin"), resumeRoutes);
    app.use("/api/portfolio", checkAuth, applyRoleMiddleware("admin"), portfolioRoutes);
  };
  
  



export default groupRoutes;