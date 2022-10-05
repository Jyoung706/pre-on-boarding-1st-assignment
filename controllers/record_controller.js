const pool = require("../models/common");
const recordService = require("../services/record_service");

const getRecordWithData = async (req, res) => {
    const {recordId} = req.params;
    const result = await recordService.getRecordWithData(recordId);
    res.status(200).json({result: result});
};

const recordDataController = async (req, res) => {
    const { id } = req.headers;
    const { weight } = req.body;
    const typeData = req.body.type_data;
    const conn = await pool.getConnection(async (conn) => conn);

    const rangeCheck = (type_id, min, max) => {
        const [range] = typeData.filter((value) => value.type_id === type_id);
        if (range.type_id === type_id && (min > range.data || max < range.data)) {
        return true;
        } else {
        return false;
        }
    };

    const message = (id, min, max) => {
        return `type_id : ${id} range must be ${min}~${max}`;
    };

    try {
        if (!typeData) {
        res.status(400).json("Check Input Data");
        return;
        }
        if (!(id && weight && typeData.length)) {
        res.status(400).json("Check Input Data");
        return;
        }
        if (typeData.length === 1) {
        const typeId = typeData[0].type_id;

        if (typeId === 1 && rangeCheck(1, 0, 90) === true) {
            res.status(400).json(message(1, 0, 90));
            return;
        }

        if (typeId === 4 && rangeCheck(4, 0, 100) === true) {
            res.status(400).json(message(4, 0, 100));
            return;
        }
        if (typeId === 5 && rangeCheck(5, -100, 100) === true) {
            res.status(400).json(message(5, -100, 100));
            return;
        }

        if (typeId === (2 || 3)) {
            res.status(400).json("Shoulder flexion and shoulder extension must be a set");
            return;
        }
        }

        if (typeData.length > 1) {
        const array = [];
        typeData.map((value) => {
            array.push(value.type_id);
        });

        const duplicateInspection = new Set(array).size === array.length;
        if (!duplicateInspection) {
            res.status(400).json("Duplicate entry is not allowed.");
            return;
        }

        if ((array.includes(2) && !array.includes(3)) || (!array.includes(2) && array.includes(3))) {
            res.status(400).json("Shoulder flexion and shoulder extension must be a set");
            return;
        }

        if (array.includes(1) && rangeCheck(1, 0, 90) === true) {
            res.status(400).json(message(1, 0, 90));
            return;
        }

        if (array.includes(2) && rangeCheck(2, 30, 170) === true) {
            res.status(400).json(message(2, 30, 170));
            return;
        }

        if (array.includes(3) && rangeCheck(3, -60, -30) === true) {
            res.status(400).json(message(3, -60, -30));
            return;
        }

        if (array.includes(4) && rangeCheck(4, 0, 100) === true) {
            res.status(400).json(message(4, 0, 100));
            return;
        }
        if (array.includes(5) && rangeCheck(5, -100, 100) === true) {
            res.status(400).json(message(5, -100, 100));
            return;
        }
    }

        await conn.beginTransaction();
        await recordService.recordDataService(id, weight, typeData, conn);
        await conn.commit();
        res.status(200).json({ message: "create success" });
    } catch (err) {
        await conn.rollback();
        console.log(err);
        res.status(400 || err.statusCode).json(err.message);
    } finally {
        conn.release();
    }
};

const recordDeleteController = async (req, res) => {
    const { id } = req.params;
    const conn = await pool.getConnection(async (conn) => conn);
    try {
        await conn.beginTransaction();
        await recordService.recordDeleteService(id, conn);
        await conn.commit();
        res.status(204).json();
    } catch (err) {
        console.log(err);
        await conn.rollback();
        res.status(400 || err.statusCode).json(err.message);
    }
};

module.exports = { 
    recordDataController, 
    recordDeleteController,
    getRecordWithData
};
