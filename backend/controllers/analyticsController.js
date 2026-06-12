const Student = require("../models/Student");
const Company = require("../models/Company");
const Job = require("../models/Job");
const Application = require("../models/Application");

exports.getAnalytics = async (req, res) => {
    try {

        const totalStudents = await Student.countDocuments();

        const totalCompanies = await Company.countDocuments();

        const totalJobs = await Job.countDocuments();

        const totalApplications =
            await Application.countDocuments();

        res.status(200).json({
            totalStudents,
            totalCompanies,
            totalJobs,
            totalApplications
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};