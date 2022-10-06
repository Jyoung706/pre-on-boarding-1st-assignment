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

        const { user_id , is_active } = req.body;
        if (!user_id || !is_active ) {
            return res.status(404).json({ message : "KEY_ERROR" });
        }

        await userService.deleteUser(user_id , is_active );
        return res.status(200).json({ message : "DELETE_USER" });
    } catch (err) {
        errorhandler(err, res);
    }
};

module.exports = {
	signUp,
    deleteUser
}
  signUp,
  getMemberList
};
