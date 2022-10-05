const express = require("express");
const recordController = require("../controllers/record_controller");

const router = express.Router();

router.post("/data", recordController.recordDataController);

module.exports = router;
