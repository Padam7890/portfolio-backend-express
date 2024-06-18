

const userRoutes = require('./userRoute');
const skillRoutes = require('./skillRoute');
const testimonialsRoutes = require('./testimonialRoute')

const groupRoutes = (app)=> {
    app.use('/api/users', userRoutes);
    app.use('/api/skills', skillRoutes);
    app.use('/api/testimonials', testimonialsRoutes);
    
}


module.exports = groupRoutes;
