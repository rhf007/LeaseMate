const asyncWrapper = require("../middlewares/asyncWrapper");
const Unit = require("../models/unit.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");

const getAllUnits = asyncWrapper(async (req, res) => {
  const units = await Unit.find();
  res.json({ status: httpStatusText.SUCCESS, data: { units } });
});

module.exports = { getAllUnits };
