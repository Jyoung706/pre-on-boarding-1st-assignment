const userDao = require("../models/user_dao")
const ErrorCreator = require("../middlewares/error_creator");

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

    const validateHeight = /[0-9]/;
    if(!validateHeight.test(height)){
        const err = new Error('INVALID_HEIGHT')
        err.statusCode = 400
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

const deleteUser = async (id) => {
   
    const selectUser = await userDao.deleteUser(id)
    return selectUser;
    }

const selectDetailUser = async (user_id) => {
    const result = await userDao.isExistUser(user_id);
    if(!result){
        const error = new Error({ message: "USER_THAT_DO_NOT_EXIST"}.message);
        error.statusCode = 400;
        throw error;
    }
    
    try{
        return await userDao.getUser(user_id);
    }catch(err){
        console.log(err);
    }
}

const editUserProfile = async (userId, name, birthday, height, mobileNumber) => {
    const isExist = await userDao.isExistUser(userId);
    if(!isExist.length){
        throw new ErrorCreator("USER_NOT_EXISTS", 404);
    }
    const isActive = await userDao.checkActiveUser(userId);
    if (!isActive) {
        throw new ErrorCreator("INVALID_USER", 404);
    }

    if (!name || !birthday || !height || !mobileNumber ) {
        throw new ErrorCreator("KEY_ERROR", 400);
    }

    await checkVaildate(name, birthday, height, mobileNumber);

    return await userDao.editUserProfile(userId, name, birthday, height, mobileNumber);
};

module.exports = {
    signUp,
    checkVaildate,
    getMemberList,
    deleteUser,
    selectDetailUser,
    editUserProfile
};
