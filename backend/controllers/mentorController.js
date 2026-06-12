const Mentor =
require("../models/Mentor");

exports.createMentor =
async (req, res) => {

  try {

    const mentor =
    await Mentor.create(req.body);

    res.status(201).json(mentor);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.getMentors =
async (req, res) => {

  try {

    const mentors =
    await Mentor.find();

    res.json(mentors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};