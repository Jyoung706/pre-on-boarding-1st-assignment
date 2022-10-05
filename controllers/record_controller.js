const recordService = require("../services/record_service")

const getRecordWithData = async (req, res) => {
    const {recordId} = req.params;
    const result = await recordService.getRecordWithData(recordId);
    res.status(200).json({result: result});
};

module.exports = { getRecordWithData }