const Application =
require("../models/Application");

exports.applyJob =
async(req,res)=>{

  try{

    const application =
      await Application.create({

        studentId:req.body.studentId,
        
        jobId:req.body.jobId,
        
        fullName:req.body.fullName,
        
        email:req.body.email,
        
        cgpa:req.body.cgpa,
        
        status:"Applied",
        
        skills:
        req.body.skills
        ? req.body.skills
        .split(",")
        .map(skill=>skill.trim())
        : [],
        
        resume:
        req.file
        ? `/uploads/${req.file.filename}`
        : ""
        
        })

    res.status(201).json(
      application
    );

  }catch(error){

    console.log(error);

    res.status(500).json({
      message:error.message
    });

  }

};

exports.getApplications =
async(req,res)=>{

  try{

    const applications =
      await Application.find();

    res.json(applications);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.getApplicationsByJob =
async(req,res)=>{

  try{

    const applications =
      await Application.find({

        jobId:req.params.jobId

      });

    res.json(applications);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.updateApplication =
async(req,res)=>{

  try{

    const application =
      await Application.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
          new:true
        }

      );

    res.json(application);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};