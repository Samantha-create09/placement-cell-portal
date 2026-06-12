const mongoose = require("mongoose");

const applicationSchema =
new mongoose.Schema({

  studentId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },

  jobId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
  },

  fullName:String,

  email:String,

  cgpa:String,

  resume:String,

  skills:[String],

  status:{
    type:String,
    default:"Applied"
  },

  interviewDate:{
    type:String,
    default:""
  },

  meetingLink:{
    type:String,
    default:""
  }

},{
  timestamps:true
});

module.exports =
mongoose.model(
  "Application",
  applicationSchema
);