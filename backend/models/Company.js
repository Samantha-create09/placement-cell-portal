const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  companyName: {
    type: String,
    required: true
  },

  hrName: {
    type: String,
    default: ""
  },

  hrEmail: {
    type: String,
    default: ""
  },

  industry: {
    type: String,
    default: ""
  },

  location: {
    type: String,
    default: ""
  },

  website: {
    type: String,
    default: ""
  },

  description: {
    type: String,
    default: ""
  },

  companyDocument: {
    type: String,
    default: ""
  },

  totalJobsPosted: {
    type: Number,
    default: 0
  },

  totalHired: {
    type: Number,
    default: 0
  },

  verified: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

module.exports =
mongoose.model(
  "Company",
  companySchema
);