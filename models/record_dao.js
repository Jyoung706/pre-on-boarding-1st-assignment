const pool = require("./common");

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
    console.log("model2");
    return result
};

module.exports = { 
    getRecordWithData
}