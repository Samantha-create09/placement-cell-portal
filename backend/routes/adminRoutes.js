const express = require("express");

const router = express.Router();

const {
  approveUser
} = require(
  "../controllers/adminController"
);

router.put(
  "/approve/:id",
  approveUser
);

module.exports = router; 