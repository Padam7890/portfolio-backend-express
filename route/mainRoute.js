

const userRoutes = require('./userRoute');
const skillRoutes = require('./skillRoute');

const groupRoutes = (app)=> {
    app.use('/api/users', userRoutes);
    app.use('/api/skills', skillRoutes)
}

module.exports = groupRoutes;