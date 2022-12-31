// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > Ticket-Schema < ====== --- ====== //
const ticketSchema = mongoose.Schema(
  {
    seatNumber: [],
    price: { type: Number, default: 0 },

    matchId: { type: mongoose.Types.ObjectId, required: true, ref: "matches" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "users" },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > Macth-Model < ====== --- ====== //
const tickets = mongoose.model("tickets", ticketSchema); // create ticket collection with given (name, schema).

// ====== --- ====== > export Stadium model < ====== --- ====== //
module.exports = tickets;
