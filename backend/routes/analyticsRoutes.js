const express = require("express");

const router = express.Router();

const Application =
require("../models/Application");

router.get("/:studentId", async (req, res) => {

  try {

    const applications =
      await Application.find();

    const totalApplications =
      applications.length;

    const shortlisted =
      applications.filter(
        app =>
        app.status ===
        "Shortlisted"
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