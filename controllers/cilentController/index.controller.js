const { Client } = require("../../models/models");

const getCilent = async (req, res) => {
  try {
    const cilent = await Client.find();
    res.status(200).json({
      msg: "cilent found",
      data: cilent,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = getCilent;
