    const mongoose = require("mongoose");

    const jobSchema =
    new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    company:{
        type:String,
        required:true
    },

    location:String,

    salary:String,

    jobType:String,

    description:String,

    skills:[String],

    deadline:Date,

    applicants:{
        type:Number,
        default:0
    },

    shortlisted:{
        type:Number,
        default:0
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    },
    {
    timestamps:true
    });

    module.exports =
    mongoose.model("Job",jobSchema);