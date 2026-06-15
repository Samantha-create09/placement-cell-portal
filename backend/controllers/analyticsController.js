const Student = require("../models/Student");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");

exports.getAnalytics = async (req, res) => {

  try {

    const totalStudents =
      await User.countDocuments({
        role: "student"
      });

    const totalCompanies =
      await User.countDocuments({
        role: "company"
      });

    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    res.json({
      totalStudents,
      totalCompanies,
      totalJobs,
      totalApplications
    });

  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};