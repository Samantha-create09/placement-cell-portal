const Student = require("../models/Student");

// Create Student
exports.createStudent = async (req, res) => {
    try {

        const student = await Student.create(req.body);

        res.status(201).json(student);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Students
exports.getStudents = async (req, res) => {
    try {

        const students = await Student.find();

        res.status(200).json(students);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

const User = require("../models/User");

exports.addSkill = async (req, res) => {

    try {
  
      const user =
        await User.findById(
          req.params.id
        );
  
      user.skills =
        req.body.skills;
  
      await user.save();
  
      res.json(user);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  
  };

exports.uploadResume = async (req, res) => {
    try {
  
      const user = await User.findById(
        req.params.id
      );
  
      user.resumeUrl =
        req.file.filename;
  
      await user.save();
  
      res.json({
        resumeUrl:
        user.resumeUrl
      });
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  };

  exports.getStudentById = async (req, res) => {

    try {
  
      const student = await User.findById(
        req.params.id
      );
  
      res.json(student);
  
    } catch (error) {
  
      res.status(500).json({
        message: error.message
      });
  
    }
  
  };