const express = require("express");

const router = express.Router();

const {
    createCompany,
    getCompanies,
    getCompanyByUserId
} = require("../controllers/companyController");

router.post("/", createCompany);

router.get("/", getCompanies);
router.get(
    "/:id",
    getCompanyByUserId
  );
module.exports = router;