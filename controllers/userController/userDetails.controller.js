const { User } = require("../../models/models");

const userDetails = async (req, res) => {
  try {
    const user = await User.find()
      .sort({
        _id: 1,
      })
      .limit(1);
    res.status(200).json({
      msg: "user details found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = userDetails;
