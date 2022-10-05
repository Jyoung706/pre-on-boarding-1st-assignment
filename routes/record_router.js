const express = require("express");
const recordController = require("../controllers/record_controller");
const errorHandler = require("../middlewares/error_handler");

const router = express.Router();

router.get("/:recordId", errorHandler(recordController.getRecordWithData));

router.post("", recordController.recordDataController);
router.delete("/:id", recordController.recordDeleteController);

module.exports = router;
