const Company = require("../models/Company");

// Create Company
exports.createCompany = async (req, res) => {
    try {

        const company = await Company.create(req.body);

        res.status(201).json(company);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// Get All Companies
exports.getCompanies = async (req, res) => {
    try {

        const companies = await Company.find();

        res.status(200).json(companies);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

exports.getCompanyByUserId =
async (req,res) => {

  try {

    const company =
      await Company.findOne({

        userId:
        req.params.id

      });

    res.json(company);

  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};