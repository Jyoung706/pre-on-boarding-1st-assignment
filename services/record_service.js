const recordDao = require("../models/record_dao");
const ErrorCreator = require("../middlewares/error_creator");
const userDao = require("../models/user_dao");

const getRecordWithData = async (recordId) => {
  const isExists = await recordDao.checkExistRecord(recordId);
  if (!isExists) {
    throw new ErrorCreator("RECORD_NOT_EXISTS", 404);
  }

  const isActive = await recordDao.checkActiveRecord(recordId);
  if (!isActive) {
    throw new ErrorCreator("INVALID_RECORD", 404);
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

const recordDeleteService = async (userId, id, conn) => {
  const [checkRecord] = await recordDao.getRecordByRecordId(userId, id, conn);
  if (!checkRecord.length) {
    const err = new Error("Not exist record");
    err.statusCode = 400;
    throw err;
  }
  await recordDao.deleteRecord(id, conn);
};

const selectRecordByUser = async (user_id) => {
  const result = await userDao.isExistUser(user_id);
  if (!result) {
    const error = new Error({ message: "USER_THAT_DO_NOT_EXIST" }.message);
    error.statusCode = 400;
    throw error;
  }

  try {
    const recordList = await recordDao.getRecordByUser(user_id);
    recordList[0].records = JSON.parse(recordList[0].records);
    return recordList;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  recordDataService,
  recordDeleteService,
  getRecordWithData,
  selectRecordByUser,
};
