const userDao = require("../models/user_dao");


const getMemberList = async() => {
    const [ member ] = await userDao.getMemberList();
    return member;
}

module.exports = {
    getMemberList
}