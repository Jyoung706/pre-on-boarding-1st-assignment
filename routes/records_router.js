const express = require("express");
const recordController = require("../controllers/record_controller");

const router = express.Router();

router.post("", recordController.recordDataController);
router.delete("", recordController.recordDeleteController);

module.exports = router;
