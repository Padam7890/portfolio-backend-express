const express = require("express");
const showSkills = require("../controllers/skillsController/index.controller");
const createSkills = require("../controllers/skillsController/create.controller");
const upload = require("../middleware/upload");
const uploadToCloudinary = require("../middleware/cloudsave");
const updateSkills = require("../controllers/skillsController/update.controller");
const deleteSkill = require("../controllers/skillsController/delete.controller");
const router = express.Router();

router.get("/", showSkills);
router.post("/", upload.single("image"), uploadToCloudinary, createSkills);
router.put("/:id", upload.single("image"), uploadToCloudinary, updateSkills);
router.delete("/:id", deleteSkill);

module.exports = router;
