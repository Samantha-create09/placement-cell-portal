const User = require("../models/User");

exports.approveUser =
async (req, res) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    user.isVerified = true;

    await user.save();

    res.json({
      message:
      "User approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};  

exports.verifyUser =
async(req,res)=>{

  try{

    const user =
      await User.findById(
        req.params.id
      );

    user.isVerified = true;

    await user.save();

    res.json({
      message:
      "User verified"
    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.deleteStudent =
async(req,res)=>{

  try{

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
      "Student deleted"
    });

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.updateUser =
async(req,res)=>{

  try{

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new:true }
      );

    res.json(user);

  }
  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
exports.toggleVerification =
async (req,res)=>{

  try{

    const user =
      await User.findById(
        req.params.id
      );

    if(!user){

      return res.status(404).json({
        message:"User not found"
      });

    }

    user.isVerified =
      !user.isVerified;

    await user.save();

    res.json(user);

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
exports.getCompanies =
async(req,res)=>{

  try{

    const User =
      require("../models/User");

    const companies =
      await User.find({

        role:"company"

      });

    res.json(companies);

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

exports.deleteCompany =
async(req,res)=>{

  try{

    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:"Company deleted"
    });

  }

  catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};