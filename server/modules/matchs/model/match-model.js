// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > Macth-Schema < ====== --- ====== //
const matchSchema = mongoose.Schema(
  {
    team1: { type: String, required: true },
    team2: { type: String, required: true },

    stadium: { type: mongoose.Types.ObjectId, required: true, ref: "stadiums" },
    ticket: { type: Number, required: true },
    matchTime: { type: Number, required: true },
    matchDate: { type: Date, required: true },

    referee: { type: String, required: true },
    linesmen1: { type: String, required: true },
    linesmen2: { type: String, required: true },
    varReferee: { type: String, required: true },

    vipSeats: [],
    vipWidth: { type: Number, default: 0 },
    vipLength: { type: Number, default: 0 },

    createdBy: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > Macth-Model < ====== --- ====== //
const matchs = mongoose.model("matches", matchSchema); // create match collection with given (name, schema).

// ====== --- ====== > export Stadium model < ====== --- ====== //
module.exports = matchs;
