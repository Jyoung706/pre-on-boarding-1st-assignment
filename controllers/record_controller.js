const recordService = require("../services/record_serveice");

const recordDataController = async (req, res) => {
  const { id } = req.headers;
  const { weight } = req.body;
  const typeData = req.body.type_data;

  const message = (id, a, b) => {
    return `type_id : ${id} range must be ${a}~${b}`;
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
      const data = typeData[0].data;
      if (typeId === 1 && (data < 0 || data > 90)) {
        res.status(400).json(message(1, 0, 90));
        return;
      }

      if (typeId === 4 && (data < 0 || data > 100)) {
        res.status(400).json(message(4, 0, 100));
        return;
      }
      if (typeId === 5 && (data < -100 || data > 100)) {
        res.status(400).json(message(5, -100, 100));
        return;
      }

      if (typeId === (2 || 3)) {
        res.status(400).json("Shoulder flexion and shoulder extension must be a set");
        return;
      }
    }

    if (typeData.length > 1) {
      const typeIdOne = typeData[0].type_id;
      const typeIdTwo = typeData[1].type_id;
      const typeIdOneData = typeData[0].data;
      const typeIdTwoData = typeData[1].data;
      const resultOne = typeData.filter((value) => value.type_id === 2);
      const resultTwo = typeData.filter((value) => value.type_id === 3);

      if (resultOne.length === 2 || resultTwo.length === 2) {
        res.status(400).json("Duplicate entry is not allowed.");
        return;
      }

      if (!resultOne.length || !resultTwo.length) {
        res.status(400).json("data type except type id 2 or 3 must be one");
        return;
      }

      if (
        (typeIdOne === 2 && (30 > typeIdOneData || 170 < typeIdOneData)) ||
        (typeIdTwo === 2 && (30 > typeIdTwoData || 170 < typeIdTwoData))
      ) {
        res.status(400).json(message(2, 30, 170));
        return;
      }
      if (
        (typeIdOne === 3 && (-60 > typeIdOneData || -30 < typeIdOneData)) ||
        (typeIdTwo === 3 && (-60 > typeIdTwoData || -30 < typeIdTwoData))
      ) {
        res.status(400).json(message(3, -60, -30));
        return;
      }
    }
    await recordService.recordDataService(id, weight, typeData);
    res.status(200).json({ message: "create success" });
  } catch (err) {
    console.log(err);
    res.status(err.statusCode).json(err.message);
  }
};

module.exports = { recordDataController };
