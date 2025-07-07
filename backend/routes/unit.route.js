const express = require("express");
const router = express.Router();
const {getAllUnits} = require("../controllers/unit.controller")

router
  .route("/")
  .get(getAllUnits);

  module.exports = router;