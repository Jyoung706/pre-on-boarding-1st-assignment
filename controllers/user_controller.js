const userService = require("../services/user_service");

const errorhandler = (err, res) => {
  return res.status(err.statusCode || 500).json({ message: err.message });
};

const signUp = async (req, res) => {
  try {
    const { name, birthday, height, mobile_number } = req.body;

        if (!name || !birthday || !height || !mobile_number ) {
            return res.status(404).json({ message : "KEY_ERROR" });
        }

        await userService.signUp(name, birthday, height, mobile_number);
        await userService.checkVaildate(name, birthday, height, mobile_number);
        return res.status(201).json({ message : "USER_CREATED" });
    
    } catch (err) {
        errorhandler(err, res);
    }
  
  }


const getMemberList = async (_, res) => {
    const member = await userService.getMemberList();
    res.status(201).json({ member });
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(404).json({ message : "KEY_ERROR" });
        }
        await userService.deleteUser(id);   
        return res.status(200).json({ message : "DELETE_USER" });
    } catch (err) {
        errorhandler(err, res);
    }
};

const selectDetailUser = async (req, res) => {
    const { user_id } = req.params;
    if(isNaN(user_id)) {
        return res.status(400).json({ message: 'user_id 이/가 없습니다.' });
    }
    
    try{
        const result = await userService.selectDetailUser(user_id);
        res.status(200).json({user : result , message: "SUCCESS_GET_USER" })
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json({ message: err.message });
    }
    
}

const editUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { name, birthday, height, mobileNumber } = req.body;

    await userService.editUserProfile(userId, name, birthday, height, mobileNumber);
    res.status(200).json({ message: "USER_EDITED" })
};

module.exports = {
	signUp,
    deleteUser,
    getMemberList,
    selectDetailUser,
    editUserProfile
};
