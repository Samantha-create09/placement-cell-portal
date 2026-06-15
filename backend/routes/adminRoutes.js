const express = require("express");
const {
  approveUser,
  verifyUser,
  deleteStudent,
  toggleVerification,
  getCompanies,
  deleteCompany
} = require(
  "../controllers/adminController"
);

const router = express.Router();

router.put(
  "/approve/:id",
  approveUser
);

router.put(
  "/toggle-verification/:id",
  toggleVerification
);

router.put(
  "/verify/:id",
  verifyUser
);

router.delete(
  "/student/:id",
  deleteStudent
);

router.get(
  "/companies",
  getCompanies
);

router.delete(
  "/company/:id",
  deleteCompany
);
module.exports = router; 