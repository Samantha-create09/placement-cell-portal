const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
    
      cgpa:Number,
    
    branch:String,

    resumeUrl: {
        type:String,
        default:""
     },
     
     skills: {
        type:[String],  
        default:[]
     },

     placementStatus: {
        type: String,
        default: "Not Placed"
      },
      
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor"
      },
});

module.exports = mongoose.model(
    "Student",
    studentSchema
);