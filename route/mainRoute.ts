import { Express } from "express"; // Import Express type from express library
import user from"./userRoute";
import skillRoutes from "./skillRoute";
import testimonialsRoutes from "./testimonialRoute";
import resumeRoutes from "./resumeRoute";

const groupRoutes = (app:Express)=> {
    app.use('/api/users', user);
    app.use('/api/skills', skillRoutes);
    app.use('/api/testimonials', testimonialsRoutes);
    app.use('/api/resume', resumeRoutes);
    
}


export default groupRoutes;