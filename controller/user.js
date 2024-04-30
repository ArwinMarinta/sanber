const User = require("../models/User");

const userById = async (req, res) => {
  try {
    const id = res.locals.id;
    console.log(id);
    const data = await User.getUserById(id);

    res.status(200).json({
      status: "Success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  userById,
};
