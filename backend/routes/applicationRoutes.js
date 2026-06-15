const express = require("express");
const upload =
require("../middleware/upload");
const Application =
require("../models/Application");

const router = express.Router();

const {

  applyJob,
  getApplications,
  getApplicationsByJob,
  updateApplication

} = require("../controllers/applicationController");

router.post(
  "/",
  upload.single("resume"),
  applyJob
);

router.get(
  "/",
  getApplications
);

router.get(
  "/student/:email",
  async (req, res) => {

    try {

      const applications =
        await Application.find({

          email:
          req.params.email

        });

      res.json(applications);

    } catch (error) {

      res.status(500).json({
        message: error.message
      });

    }

  }
);

router.get(
  "/job/:jobId",
  getApplicationsByJob
);

router.put(
  "/:id",
  updateApplication
);

module.exports = router;

