const User = require("../models/User");

exports.approveUser =
async (req, res) => {

  try {

    const user =
      await User.findById(
        req.params.id
      );

    user.isVerified = true;

    await user.save();

    res.json({
      message:
      "User approved successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};