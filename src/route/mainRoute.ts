import { Express } from "express"; // Import Express type from express library
import user from"./userRoute";
import skillRoutes from "./skillRoute";
import testimonialsRoutes from "./testimonialRoute";
import resumeRoutes from "./resumeRoute";
import portfolioRoutes from "./portfolioRoutes";
import generalRoute from "./generalRoute";

const groupRoutes = (app:Express)=> {
    app.use("/api/general",generalRoute)
    app.use('/api/users', user);
    app.use('/api/skills', skillRoutes);
    app.use('/api/testimonials', testimonialsRoutes);
    app.use('/api/resume', resumeRoutes);
    app.use("/api/portfolio", portfolioRoutes);
    
}



export default groupRoutes;