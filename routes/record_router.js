const express = require("express");
const recordController = require("../controllers/record_controller")

const recordRouter = express.Router();

recordRouter.get("/:recordId", recordController.getRecordWithData)


module.exports = recordRouter;
