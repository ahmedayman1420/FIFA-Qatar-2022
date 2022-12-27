// ===== --- ===== ### Stadium-Regex ### ===== --- ===== //
const validName = new RegExp(
  // Valid name
  /^([A-Za-z0-9]+\s*)+$/
);

const validSeat = new RegExp(
  // Valid name
  /^[0-9]+$/
);

export const stadiumRegex = {
  name: validName,
  location: validName,
  openDate: "",

  seats: validSeat,
  vipSeats: validSeat,
  vipWidth: validSeat,
  vipLength: validSeat,

  image: "",
};
