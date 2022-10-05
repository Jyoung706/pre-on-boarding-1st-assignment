const recordDao = require("../models/record_dao");

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
module.exports = { recordDataService, recordDeleteService };
