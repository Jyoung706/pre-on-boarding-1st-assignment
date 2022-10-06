const userDao = require("../models/user_dao")

const checkVaildate = async (name, birthday, height, mobile_number) => {
    
    const validateName = /^[가-힣]{2,4}$/;
    if(!validateName.test(name)) {
        const err = new Error('INVALID_NAME')
        err.statusCode = 409
        throw err
    }

    const validateBirthDay = /^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    if(!validateBirthDay.test(birthday)) {
        const err = new Error('INVALID_BIRTHDAY')
        err.statusCode = 409
        throw err
    }

    const validateMobileNumber = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    if(!validateMobileNumber.test(mobile_number)) {
        const err = new Error('INVALID_MOBILE_NUMBER')
        err.statusCode = 409
        throw err
    } 

};

const signUp = async (name, birthday, height, mobile_number) => {
    const user = await userDao.userCheck(mobile_number)
    console.log(user);
    if(user) { 
        const err = new Error('EXIST USER')
        err.statusCode = 409
        throw err
    }
    await userDao.createUser(name, birthday, height, mobile_number)

    return;
};


const getMemberList = async() => {
    const [ member ] = await userDao.getMemberList();
    return member;
};


module.exports = {
    signUp,
    checkVaildate,
    getMemberList
};