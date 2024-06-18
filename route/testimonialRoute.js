const express = require("express");
const showTestimonials = require("../controllers/testimonialsController/index.controller");
const createTestimonials = require("../controllers/testimonialsController/create.controller");
const updateTestimonials = require("../controllers/testimonialsController/update.controller");
const deleteTestimonials = require("../controllers/testimonialsController/delete.controller");
const upload = require("../middleware/upload");
const uploadToCloudinary = require("../middleware/cloudsave");
const router = express.Router();

router.get("/", showTestimonials);
router.post(
  "/",
  upload.single("photo"),
  uploadToCloudinary,
  createTestimonials
);
router.put(
  "/:id",
  upload.single("photo"),
  uploadToCloudinary,
  updateTestimonials
);
router.delete("/:id", deleteTestimonials);

module.exports = router;