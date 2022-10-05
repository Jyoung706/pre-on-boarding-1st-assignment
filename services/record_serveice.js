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

module.exports = { recordDataService };
