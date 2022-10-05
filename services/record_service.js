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

const recordDataService = async (id, weight, typeData, conn) => {
    await recordDao.createRecord(id, weight, conn);
    const [recordId] = await recordDao.getRecordIdByUserId(id, conn);
    if (typeData.length === 1) {
        typeData = typeData[0];
        await recordDao.createRecordData(recordId[0].id, typeData, conn);
    } else {
        for (let i in typeData) {
        await recordDao.createRecordData(recordId[0].id, typeData[i], conn);
        }
    }
    };

    const recordDeleteService = async (id, conn) => {
    const [checkRecord] = await recordDao.getRecordByRecordId(id, conn);
    if (!checkRecord.length) {
        const err = new Error("Not exist record");
        err.statusCode = 400;
        throw err;
    }
    await recordDao.deleteRecord(id, conn);
};

module.exports = { 
    recordDataService, 
    recordDeleteService,
    getRecordWithData
};