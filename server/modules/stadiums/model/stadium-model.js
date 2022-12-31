// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > Stadium-Schema < ====== --- ====== //
const stadiumSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    location: { type: String, required: true },

    openDate: { type: Date, required: true },

    seats: { type: Number, required: true },

    vipSeats: { type: Number, required: true },
    vipWidth: { type: Number, required: true },
    vipLength: { type: Number, required: true },

    image: { type: String, required: true },

    exploreMore: { type: String, required: true },

    createdBy: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > Stadium model < ====== --- ====== //
const stadiums = mongoose.model("stadiums", stadiumSchema); // create stadium collection with given (name, schema).

// ====== --- ====== > export Stadium model < ====== --- ====== //
module.exports = stadiums;
