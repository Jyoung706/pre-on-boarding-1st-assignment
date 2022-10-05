const express = require("express");
const router = express.Router();
const userRouter = require("./user_router");
const recordRouter = require("./records_router");

router.use("/users", userRouter);
router.use("/records", recordRouter);

module.exports = router;
