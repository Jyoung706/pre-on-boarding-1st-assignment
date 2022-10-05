const express = require("express");
const recordController = require("../controllers/record_controller");
const errorHandler = require("../middlewares/error_handler");

const recordRouter = express.Router();

recordRouter.get("/:recordId", errorHandler(recordController.getRecordWithData));


module.exports = recordRouter;
