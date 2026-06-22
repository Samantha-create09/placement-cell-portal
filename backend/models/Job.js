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

    minCgpa:{
      type:Number,
      default:0
      },
      
      branch:{
      type:String,
      default:"All"
      },

    deadline:Date,

    applicants:{
        type:Number,
        default:0
    },

    shortlisted:{
        type:Number,
        default:0
    },

    isPaused:{
        type:Boolean,
        default:false
      },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
      },
      
      interviews:{
        type:Number,
        default:0
      },
      
      selected:{
        type:Number,
        default:0
      }

    },
    {
    timestamps:true
    });

    module.exports =
    mongoose.model("Job",jobSchema);