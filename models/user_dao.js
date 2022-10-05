const pool = require("./common");

const errorHandler = () => {
    const err = new Error('INVALID_DATA_INPUT');
    err.statusCode = 500; 
    throw err;
};

const userCheck = async (name, birthday, height, mobile_number) => {
    try {
        return await pool.query(`
        SELECT EXISTS
        (SELECT mobile_number FROM users
        WHERE mobile_number = "${mobile_number}");
        `)
    } catch (err) {
        errorHandler();
    }
};

const createUser = async (name, birthday, height, mobile_number) => {
    try{
        return await pool.query(`    
            INSERT INTO users (
                name,
                birthday,
                height,
                mobile_number
            ) VALUES (?, ?, ?, ?);`,
            [name, birthday, height, mobile_number]  
        );
    } catch (err) {
        errorHandler();
    }
};

const deleteUser = async (user_id, is_active) => {
    return await pool.query(`
    UPDATE users SET is_active = ${is_active} WHERE id = ${user_id} ;`,
    [user_id, is_active]);

}


const verifiedUser= async(user_id, is_active) => {
    return await pool.query(`
    SELECT * FROM users WHERE id = ${user_id}
    ;`,[user_id, is_active]);
}

module.exports = {
    createUser,
    userCheck,
    deleteUser,
    verifiedUser
}

