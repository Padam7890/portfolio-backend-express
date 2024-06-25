

const userRoutes = require('./userRoute');
const skillRoutes = require('./skillRoute');
const testimonialsRoutes = require('./testimonialRoute');
const resumeRoutes = require('./resumeRoute');

const groupRoutes = (app)=> {
    app.use('/api/users', userRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/testimonials', testimonialsRoutes);
    app.use('/api/resume', resumeRoutes)
    
}


module.exports = groupRoutes;
