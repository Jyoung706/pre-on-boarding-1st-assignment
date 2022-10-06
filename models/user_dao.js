const pool = require("./common");

const errorHandler = () => {
  const err = new Error("INVALID_DATA_INPUT");
  err.statusCode = 500;
  throw err;
};

const userCheck = async (mobile_number) => {
    const [[user]] = await pool.query(` 
    SELECT * FROM users WHERE mobile_number = ?;`
    , [mobile_number])
    return user; 
  
}

const createUser = async (name, birthday, height, mobile_number) => {
  try {
    return await pool.query(
      `    
            INSERT INTO users (
                name,
                birthday,
                height,
                mobile_number
            ) VALUES (?, ?, ?, ?);`,
            [name, birthday, height, mobile_number]);
    } catch (err) {
      errorHandler();
    }
};

const deleteUser = async (id) => {
    const [selectUser] = await pool.query(`
    UPDATE users SET is_active = 0 WHERE id = ?;`,
    [id]);
    return selectUser;
   
} 


const getMemberList = async() => {
    return await pool.query(
        `SELECT * FROM users`
    )
};

const isExistUser = async (user_id)=>{
  const [user] = await pool.query(`
  SELECT u.id 
  FROM users u 
  WHERE u.id = ?
  ;`, [user_id])
  
  return user
}

const getUser = async (user_id)=>{
  const [user] = await pool.query(`
  SELECT u.id 
, u.name 
, u.birthday 
, u.height 
, u.mobile_number 
, (SELECT COUNT(*) FROM records r WHERE r.user_id = ?) AS number_of_measurements 
  FROM users u 
  WHERE u.id = ?
  ;`, [user_id, user_id])
  
  return user
}

const checkActiveUser = async (userId) => {
  const [[isActive]] = await pool.query(
    `
        SELECT users.is_active 
        FROM users
        WHERE users.id=?;`,
    [userId]
  );
  return isActive.is_active;
};

const editUserProfile = async (userId, name, birthday, height, mobileNumber) => {
  return await pool.query(
    `
    UPDATE users 
    SET 
      name = ?,
      birthday = ?,
      height = ?,
      mobile_number = ?
    WHERE id = ?
    ;`, [name, birthday, height, mobileNumber, userId]
  );
};

module.exports = {
  createUser,
  userCheck,
  getMemberList,
  deleteUser,
  isExistUser,
  getUser,
  editUserProfile,
  checkActiveUser
};
