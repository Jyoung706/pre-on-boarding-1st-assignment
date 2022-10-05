require("dotenv").config();
const http = require("http");
const { createApp } = require("./app");
//const recordController = require("./controllers/record_controller")

const app = createApp();
const server = http.createServer(app);

app.get("/ping", (req, res) => {
    res.json({ message: "pong" });
});

// app.get("/records/:recordId", recordController.getRecordWithData);
    // 예외: 존재하지 않는 기록 요청
    //============================================================
    // const [[isExists]] = await pool.query(`
    // SELECT EXISTS (SELECT 1 FROM records WHERE id = "${recordId}");`);
    // console.log("isExists: ", !!Object.values(isExists)[0]);

    // if (!Object.values(isExists)[0]) {
    //     return res.status(404).json({message: "RECORD_DOES_NOT_EXIST"})
    // }
    
    // ========================================================
    // // 예외: 삭제한(비활성화) 유저의 기록 요청
    // const [[isActive]] = await pool.query(`
    //     SELECT users.is_active 
    //     FROM users
    //     JOIN records ON users.id = records.user_id
    //     WHERE records.id=?;`, [recordId]);

    // if(!isActive.is_active){
    //     console.log("삭제된유저")
    //     return res.status(400).json({message: "INVALID_RECORD"})
    // }
    // ===========================================================

server.listen(8000, () => {
    console.log("server start : http://localhost:8000");
});
