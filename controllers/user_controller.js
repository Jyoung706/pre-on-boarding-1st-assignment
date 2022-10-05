const userService = require("../services/user_service");

const getMemberList = async (_, res) => {
    const member = await userService.getMemberList();
    res.status(201).json({ member });
};

module.exports = {
    getMemberList
}