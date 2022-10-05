const recordDao = require("../models/record_dao")
const ErrorCreator = require("../middlewares/error_creator");

const getRecordWithData = async (recordId) => {
    const isExists = await recordDao.checkExistRecord(recordId);
    if (!isExists) {
        throw new ErrorCreator("RECORD_NOT_EXISTS", 404)
    }

    const isActive = await recordDao.checkActiveRecord(recordId);
    if (!isActive) {
        throw new ErrorCreator("INVALID_RECORD", 404)
    }

    return await recordDao.getRecordWithData(recordId);
};

module.exports = { getRecordWithData }