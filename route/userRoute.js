const express = require('express');
const createUser = require('../controllers/userController/create.controller');
const upload = require('../middleware/upload');
const uploadToCloudinary = require('../middleware/cloudsave');
const loginUser = require('../controllers/userController/login.controller');
const userDetails = require('../controllers/userController/userDetails.controller');
const router = express.Router();

router.post('/',upload.single('profileImage'), uploadToCloudinary,  createUser);
router.post('/login',  loginUser)
router.get('/user', userDetails)
module.exports = router;