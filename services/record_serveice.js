const recordDao = require("../models/record_dao");

const recordDataService = async (id, weight, typeData) => {
  await recordDao.createRecord(id, weight);
  const [recordId] = await recordDao.getRecordIdByUserId(id);
  if (typeData.length === 1) {
    typeData = typeData[0];
    await recordDao.createRecordData(recordId.id, typeData);
  } else {
    for (let i in typeData) {
      await recordDao.createRecordData(recordId.id, typeData[i]);
    }
  }
};

module.exports = { recordDataService };
