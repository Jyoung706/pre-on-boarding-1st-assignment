const express = require("express");
const userController = require("../controllers/user_controller");
const router = express.Router();

router.post('/sign-up', userController.signUp);
router.post('/delete', userController.deleteUser);
router.get("/members", userController.getMemberList);
router.get('/detail/:user_id', userController.selectDetailUser);

module.exports = router;
