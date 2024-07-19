import { Express } from "express"; // Import Express type from express library
import user from"./userRoute";
import skillRoutes from "./skillRoute";
import testimonialsRoutes from "./testimonialRoute";
import resumeRoutes from "./resumeRoute";
import portfolioRoutes from "./portfolioRoutes";
import generalRoute from "./generalRoute";
import checkAuth from "../middleware/auth";

const groupRoutes = (app:Express)=> {
    app.use("/api/general", checkAuth,  generalRoute)
    app.use('/api/users', user);
    app.use('/api/skills', checkAuth, skillRoutes);
    app.use('/api/testimonials',checkAuth, testimonialsRoutes);
    app.use('/api/resume', checkAuth, resumeRoutes);
    app.use("/api/portfolio", checkAuth, portfolioRoutes);
    
}



export default groupRoutes;