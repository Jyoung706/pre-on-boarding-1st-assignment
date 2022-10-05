const express = require("express");

const userRouter = require("./user_router");
const recordRouter = require("./records_router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/records", recordRouter);

module.exports = router;
