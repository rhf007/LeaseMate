const asyncWrapper = require("../middlewares/asyncWrapper");
const Unit = require("../models/unit.model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const { validationResult } = require("express-validator");

const getAllUnits = asyncWrapper(async (req, res) => {
  const units = await Unit.find();
  res.json({ status: httpStatusText.SUCCESS, data: { units } });
});

const addUnit = asyncWrapper(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }

  const unit = new Unit(req.body);
  await unit.save();

  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { unit: unit } });
});

const updateUnit = asyncWrapper(async (req, res) => {});

const deleteUnit = asyncWrapper(async (req, res) => {});

module.exports = { getAllUnits, addUnit, updateUnit, deleteUnit };
//TODO: handle unit update and delete