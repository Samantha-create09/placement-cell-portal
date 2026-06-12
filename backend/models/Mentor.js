const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  department: {
    type: String
  },

  designation: {
    type: String
  },

  assignedStudents: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]
});

module.exports =
mongoose.model(
  "Mentor",
  mentorSchema
);