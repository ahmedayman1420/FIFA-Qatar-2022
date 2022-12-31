// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const matchs = require("../model/match-model");
const users = require("../../users/model/user-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

// ====== --- ====== > Match-Methods < ====== --- ====== //
/*
//==// Create match
*/
const craeteMatch = async (req, res) => {
  try {
    let {
      team1,
      team2,

      stadium,
      ticket,
      matchTime,
      matchDate,

      referee,
      linesmen1,
      linesmen2,
      varReferee,
    } = req.body;
    let { username } = req.decoded;

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      const oldMatches = await matchs.find({
        matchDate,
        $or: [
          {
            team1: {
              $in: [team1, team2],
            },
          },
          {
            team2: {
              $in: [team1, team2],
            },
          },
        ],
      });
      if (oldMatches.length == 0) {
        const newMatch = new matchs({
          team1,
          team2,

          stadium,
          ticket,
          matchTime,
          matchDate,

          referee,
          linesmen1,
          linesmen2,
          varReferee,

          createdBy: oldUser._id,
        });
        const data = await newMatch.save();
        const oldMatch = await matchs
          .findOne({ _id: newMatch._id })
          .populate("stadium");

        let vipSeats = new Array(oldMatch.stadium.vipSeats).fill(0);
        let matchUpdated = await matchs
          .updateOne(
            { _id: newMatch._id },
            {
              vipSeats,
              vipWidth: oldMatch.stadium.vipWidth,
              vipLength: oldMatch.stadium.vipLength,
            },
            { new: true }
          )
          .populate("stadium");

        newMatch.vipSeats = vipSeats;
        newMatch.vipWidth = oldMatch.stadium.vipWidth;
        newMatch.vipLength = oldMatch.stadium.vipLength;

        res.status(StatusCodes.CREATED).json({
          message: "Match Created Successfully",
          payload: { match: newMatch },
        });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Team can not have two matches at the same day" });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Get Home Matchs
*/
const getHomeMatches = async (req, res) => {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  let yesterday =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  date = new Date();
  date.setDate(date.getDate());
  let today =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  date = new Date();
  date.setDate(date.getDate() + 1);
  let tomorrow =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);
  try {
    const fifaMatchs = await matchs
      .find({
        matchDate: {
          $in: [yesterday, today, tomorrow],
        },
      })
      .populate("stadium");

    res.status(StatusCodes.CREATED).json({
      message: "Matchs Shown Successfully",
      payload: { matches: fifaMatchs },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Get All Matchs
*/
const getMatches = async (req, res) => {
  var date = new Date();
  let today =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2);

  try {
    let fifaCommingMatchs = await matchs
      .find({
        matchDate: {
          $gt: today,
        },
      })
      .populate("stadium");

    let fifaTodayMatchs = await matchs
      .find({
        matchDate: today,
      })
      .populate("stadium");

    let date = new Date();
    let hour = date.getHours();
    fifaTodayMatchs = fifaTodayMatchs.filter((match) => {
      return match.matchTime > hour;
    });

    fifaCommingMatchs.push(...fifaTodayMatchs);

    res.status(StatusCodes.CREATED).json({
      message: "Matchs Shown Successfully",
      payload: { matches: fifaCommingMatchs },
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

/*
//==// Edit Match
*/
const editMatch = async (req, res) => {
  try {
    let { match } = req.body;
    let { username } = req.decoded;

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      const oldMatches = await matchs.find({
        matchDate: match.matchDate,
        _id: {
          $ne: match._id,
        },
        $or: [
          {
            team1: {
              $in: [match.team1, match.team2],
            },
          },
          {
            team2: {
              $in: [match.team1, match.team2],
            },
          },
        ],
      });
      if (oldMatches.length == 0) {
        const data = await matchs.updateOne(
          { _id: match._id },
          {
            team1: match.team1,
            team2: match.team2,

            stadium: match.stadium,
            matchTime: match.matchTime,
            matchDate: match.matchDate,

            referee: match.referee,
            linesmen1: match.linesmen1,
            linesmen2: match.linesmen2,
            varReferee: match.varReferee,
          },
          { new: true }
        );

        const updatedMatch = await matchs.findOne({
          _id: match._id,
        });

        res.status(StatusCodes.CREATED).json({
          message: "Matchs Edit Successfully",
          payload: { match: updatedMatch },
        });
      } else
        res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Team can not have two matches at the same day" });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

// const updateTicket = async (req, res) => {
//   try {
//     let { id, ticket } = req.body;
//     let data = await matchs.updateOne({ _id: id }, { ticket });

//     res.status(StatusCodes.CREATED).json({
//       message: "Matchs Shown Successfully",
//       payload: { data },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  craeteMatch,
  getHomeMatches,
  getMatches,
  editMatch,
  // updateTicket,
};
