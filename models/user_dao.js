const pool = require("./common");

const getMemberList = async() => {
    return await pool.query(
        `SELECT * FROM users`
    )
}

module.exports = {
    getMemberList
}


