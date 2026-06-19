const express = require("express");

const router = express.Router();

const {
    register,
    login

} = require("../controllers/authController");
const companyUpload =
require(
  "../middleware/companyUpload"
);

router.post(

  "/register",

  companyUpload.single(
    "companyDocument"
  ),

  register

);

router.post("/login", login);

module.exports = router;