// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// ====== --- ====== > User-Schema < ====== --- ====== //
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    birthDate: { type: Date, required: true },
    gender: { type: String, required: true },

    nationality: { type: String },

    email: {
      type: String,
      required: true,
      unique: false,
    },

    role: { type: String, default: "fan" },
    isDeleted: { type: Boolean, default: false },
  },

  {
    timestamps: true, // To save (creation, update) time
  }
);

// ====== --- ====== > User Hooks < ====== --- ====== //
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 7);
});

// ====== --- ====== > user model < ====== --- ====== //
const users = mongoose.model("users", userSchema); // create user collection with given (name, schema).

// ====== --- ====== > export user model < ====== --- ====== //
module.exports = users;
