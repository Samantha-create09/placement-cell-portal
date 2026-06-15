const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "company", "admin", "mentor"],
    default: "student"
  },

  skills: {
    type: [String],
    default: []
  },
  
  resumeUrl: {
    type: String,
    default: ""
  },
  
  companyDocument: {
    type: String,
    default: ""
  },
  
  isVerified: {
    type: Boolean,
    default: false
  },

}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);