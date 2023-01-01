// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const matchs = require("../model/match-model");
const users = require("../../users/model/user-model");
const tickets = require("../model/ticket-model");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const stripe = require("stripe")(
  "sk_test_51MLBW5CYNUMBhAJ0E3scKg3eOvp8hJE0SLV9vu2OPNiv36tdd1XpnsE7P3kmOH12KFUH9KRmZrEBR53C7uL38RKq00uHgUENi4"
);

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

/*
//==// buy ticket
*/
const buyTicket = async (req, res) => {
  try {
    let { amount, id, matchId, boughtTickets } = req.body;
    let { username } = req.decoded;

    console.log(boughtTickets[0].key);

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      let seatNumber = [];
      let seat = 0;
      for (var i = 0; i < boughtTickets.length; i++) {
        seat = boughtTickets[i].key;
        seatNumber.push(seat);
      }

      // ================= Update-Seats ================= //
      const oldMatch = await matchs.findOne({ _id: matchId, isDeleted: false });
      let vipSeats = oldMatch.vipSeats;
      for (var i = 0; i < seatNumber.length; i++) {
        if (vipSeats[seatNumber[i]] == 0) vipSeats[seatNumber[i]] = oldUser._id;
        else {
          res.json({
            message: "Reserved Seats",
            success: false,
          });

          break;
        }
      }
      const updatedMatch = await matchs.updateOne(
        {
          _id: matchId,
          isDeleted: false,
        },
        {
          vipSeats,
        }
      );

      // ================= Create-Ticket ================= //
      const newticket = new tickets({
        seatNumber,
        price: (amount / 100) * seatNumber.length,
        matchId,
        userId: oldUser._id,
      });
      const data = await newticket.save();

      // ================= Payment ================= //
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: "CMP Company",
        payment_method: id,
        confirm: true,
      });
      console.log("Payment", payment);
      res.json({
        message: "Payment successful",
        success: true,
      });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "User Not Found" });
    }
  } catch (error) {
    console.log("Error", error);
    res.json({
      message: "Payment failed",
      success: false,
    });
  }
};

/*
//==// Get All Tickets
*/
const getTickets = async (req, res) => {
  try {
    let { username } = req.decoded;

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      const data = await tickets
        .find({ userId: oldUser._id })
        .populate("userId")
        .populate({
          path: "matchId",
          populate: {
            path: "stadium",
          },
        });
      res.status(StatusCodes.CREATED).json({
        message: "Tickets Shown Successfully",
        payload: { tickets: data },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    let { username } = req.decoded;
    let { _id } = req.body;

    const oldUser = await users.findOne({ username, isDeleted: false });
    if (oldUser) {
      const ticket = await tickets.findOne({ _id });
      const match = await matchs.findOne({ _id: ticket.matchId });

      let vipSeats = match.vipSeats;
      let seatNumber = ticket.seatNumber;
      for (var i = 0; i < seatNumber.length; i++) {
        vipSeats[seatNumber[i]] = 0;
      }

      const data = await matchs.updateOne(
        { _id: ticket.matchId },
        { vipSeats }
      );

      const deletedData = await tickets.deleteOne({ _id });

      res.status(StatusCodes.CREATED).json({
        message: "Ticket Deleted Successfully",
        payload: { tickets: data },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = {
  craeteMatch,
  getHomeMatches,
  getMatches,
  editMatch,
  buyTicket,
  getTickets,
  deleteTicket,
  deleteTicket,
};
