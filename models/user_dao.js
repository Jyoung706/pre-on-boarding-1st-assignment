const pool = require("./common");

const errorHandler = () => {
  const err = new Error("INVALID_DATA_INPUT");
  err.statusCode = 500;
  throw err;
};

const userCheck = async (name, birthday, height, mobile_number) => {
  try {
    return await pool.query(`
        SELECT EXISTS
        (SELECT mobile_number FROM users
        WHERE mobile_number = "${mobile_number}");
        `);
  } catch (err) {
    errorHandler();
  }
};

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
      [name, birthday, height, mobile_number]
    );
  } catch (err) {
    errorHandler();
  }
};

module.exports = {
  createUser,
  userCheck,
};
