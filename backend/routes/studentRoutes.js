const express = require("express");
const upload = require("../middleware/upload");
const router = express.Router();

const {
    createStudent,
    getStudents,
    addSkill,
    uploadResume
  } = require("../controllers/studentController");

const {
    getStudentById
  } = require("../controllers/studentController");

router.post("/", createStudent);

router.get("/", getStudents);

router.get("/:id", getStudentById);

router.put(
    "/:id/skills",
    addSkill
  );

router.post(
    "/resume/:id",
    upload.single("resume"),
    uploadResume
  );
module.exports = router;