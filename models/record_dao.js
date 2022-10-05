const pool = require("./common");

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
};
