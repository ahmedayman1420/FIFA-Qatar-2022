// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const stadiums = require("../model/stadium-model");
const users = require("../../users/model/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > Stadium-Methods < ====== --- ====== //
/*
//==// Create Stadium
*/
const craeteStadium = async (req, res) => {
  try {
    let {
      name,
      location,
      openDate,

      seats,
      vipSeats,
      vipWidth,
      vipLength,

      exploreMore,
      image,
    } = req.body;
    let { username } = req.decoded;

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      const newStadiums = new stadiums({
        name,
        location,
        openDate,

        seats,
        vipSeats,
        vipWidth,
        vipLength,

        exploreMore,
        image,
        createdBy: oldUser._id,
      });
      const data = await newStadiums.save();

      res.status(StatusCodes.CREATED).json({
        message: "Stadium Created Successfully",
        payload: { stadium: newStadiums },
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Get Stadiums
*/

const getStadiums = async (req, res) => {
  try {
    const fifaStadiums = await stadiums.find({});

    res.status(StatusCodes.CREATED).json({
      message: "Stadiums Shown Successfully",
      payload: { stadiums: fifaStadiums },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  craeteStadium,
  getStadiums,
};
