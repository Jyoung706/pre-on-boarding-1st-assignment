const userService = require("../services/user_service")

const errorhandler = (err,res) => {
    return res.status(err.statusCode || 500).json({ message : err.message });
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
};

module.exports = {
	signUp
}
