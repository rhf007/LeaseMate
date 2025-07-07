const express = require("express");
const router = express.Router();
const {getAllUnits, addUnit, updateUnit, deleteUnit} = require("../controllers/unit.controller")

router
  .route("/")
  .get(getAllUnits)
  .post(addUnit)
  .patch(updateUnit)
  .delete(deleteUnit)
  module.exports = router;