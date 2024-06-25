
const express = require('express');
const resumeSave = require('../controllers/resumeController/create.controller');
const updateResume = require('../controllers/resumeController/update.controller');
const getResume = require('../controllers/resumeController/index.controller');
const router = express.Router();

router.get('/', getResume)
router.post('/', resumeSave);
router.put('/:id', updateResume)

module.exports = router;