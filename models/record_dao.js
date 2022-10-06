const pool = require("./common");

const checkExistRecord = async (recordId) => {
    const [[isExists]] = await pool.query(`
    SELECT EXISTS (SELECT 1 FROM records WHERE id = "${recordId}");`);
    return Object.values(isExists)[0]
}

const checkActiveRecord = async (recordId) => {
    const [[isActive]] = await pool.query(`
        SELECT users.is_active 
        FROM users
        JOIN records ON users.id = records.user_id
        WHERE records.id=?;`, [recordId]);
    return isActive.is_active
};

const getRecordWithData = async (recordId) => {
    const [[result]] = await pool.query(`
        SELECT
            users.id as userId,
            users.name as userName,
            users.birthday as userBirthday,
            users.height as userHeight,
            users.mobile_number as userMobileNumber,
            records.id as recordId,
            records.weight as userWeightOnRecord,
            records.created_at as recordDateTime,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'recordDataId', record_data.id,
                    'recordTypeId', record_data.record_type_id,
                    'recordType', record_types.type,
                    'recordDataOnType', record_data.data
                )
            ) as recordData
        FROM record_data
        JOIN record_types ON record_types.id = record_data.record_type_id
        JOIN records ON records.id = record_data.record_id
        JOIN users ON users.id = records.user_id
        WHERE records.id = ?
        GROUP BY records.id
    ;`, [recordId]);
    return result
};

const createRecord = async (id, weight, conn) => {
    await conn.query(
        `INSERT INTO records (user_id,weight) VALUES (?,?);
        `,
        [id, weight],
        (err) => {
        throw err;
        }
    );
};

const getRecordIdByUserId = async (id, conn) => {
    return await conn.query(
        `SELECT id FROM records 
        WHERE user_id = ?
        ORDER BY created_at DESC LIMIT 1;
        `,
        [id],
        (err) => {
        throw err;
        }
    );
};

const createRecordData = async (recordId, typeData, conn) => {
    await conn.query(
        `INSERT INTO record_data (record_id,record_type_id,data) 
        VALUES (?,?,?);
        `,
        [recordId, typeData.type_id, typeData.data],
        (err) => {
        throw err;
        }
    );
};

const getRecordByRecordId = async (id, conn) => {
    return await conn.query(
        `SELECT id FROM records WHERE id = ?;
        `,
        [id],
        (err) => {
        throw err;
        }
    );
};

const deleteRecord = async (id, conn) => {
    await conn.query(
        `DELETE FROM records WHERE id = ?;
    `,
        [id],
        (err) => {
        throw err;
        }
    );
};

module.exports = {
    createRecord,
    getRecordIdByUserId,
    createRecordData,
    getRecordByRecordId,
    deleteRecord,
    getRecordWithData,
    checkActiveRecord,
    checkExistRecord
};
