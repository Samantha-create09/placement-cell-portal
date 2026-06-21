const express = require("express");

const router = express.Router();

const Application =
require("../models/Application");

const {
  getAnalytics
} = require("../controllers/analyticsController");

router.get(
  "/admin",
  getAnalytics
);

router.get("/:studentId", async (req, res) => {

  try {

    const Student =
require("../models/Student");

const student =
await Student.findOne({

userId: req.params.studentId

});

const applications =
await Application.find({

email: student.email

});

    const totalApplications =
      applications.length;

      const shortlisted =
      applications.filter(
      
      app =>
      
      app.status === "Shortlisted"
      
      ||
      
      app.status === "Interview Scheduled"
      
      ||
      
      app.status === "Selected"
      
      ).length;

    const interviews =
      applications.filter(
        app =>
        app.status ===
        "Interview Scheduled"
      ).length;

    const offers =
      applications.filter(
        app =>
        app.status ===
        "Selected"
      ).length;

    res.json({
      applications:
      totalApplications,

      shortlisted,

      interviews,

      offers
    });

  } catch (error) {

    res.status(500).json({
      message:error.message
    });

  }

});

module.exports = router;