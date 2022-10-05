const recordDao = require("../models/record_dao")

const getRecordWithData = async (recordId) => {
    return await recordDao.getRecordWithData(recordId);
};

module.exports = { getRecordWithData }