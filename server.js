require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");
const pool = require("./models/common");

const app = createApp();
const server = http.createServer(app);

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

app.get("/records/:recordId", async (req, res) => {
    const {recordId} = req.params;

    // 예외: 존재하지 않는 기록 요청
    const [[isExists]] = await pool.query(`
    SELECT EXISTS (SELECT 1 FROM records WHERE id = "${recordId}");`);
    console.log("isExists: ", !!Object.values(isExists)[0]);

    if (!Object.values(isExists)[0]) {
        return res.status(404).json({message: "RECORD_DOES_NOT_EXIST"})
    }
    

    // 예외: 삭제한(비활성화) 유저의 기록 요청
    const [[isActive]] = await pool.query(`
        SELECT users.is_active 
        FROM users
        JOIN records ON users.id = records.user_id
        WHERE records.id=?;`, [recordId]);

    if(!isActive.is_active){
        console.log("삭제된유저")
        return res.status(400).json({message: "INVALID_RECORD"})
    }
    
    // 정상요청
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
    res.status(200).json({result: result});
});

server.listen(8000, () => {
    console.log("server start : http://localhost:8000");
});
