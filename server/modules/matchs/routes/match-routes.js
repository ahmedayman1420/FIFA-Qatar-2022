// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const matchFunctions = require("../controller/match-control");
const matchSchemas = require("../joi/match-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const matchEndpoints = require("../matchEndpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");

// ====== --- ====== > Match Routes < ====== --- ====== //

// create match api
router.post(
  "/match/create",
  validateRequest(matchSchemas.createMatchSchema),
  isAuthorized(matchEndpoints.CreateMatchAPI),
  matchFunctions.craeteMatch
);

// get home matches api
router.get("/home-matches/get", matchFunctions.getHomeMatches);

// get all matches api
router.get("/matches/get", matchFunctions.getMatches);

// edit match api
router.put(
  "/match/edit",
  validateRequest(matchSchemas.editMatchSchema),
  isAuthorized(matchEndpoints.EditMatchAPI),
  matchFunctions.editMatch
);

// but ticket api
router.post(
  "/match/ticket",
  // validateRequest(matchSchemas.editMatchSchema),
  isAuthorized(matchEndpoints.BuyTicketAPI),
  matchFunctions.buyTicket
);

// get tickets api
router.get(
  "/tickets/get",
  // validateRequest(matchSchemas.editMatchSchema),
  isAuthorized(matchEndpoints.GetTicketsAPI),
  matchFunctions.getTickets
);

// delete tickets api
router.delete(
  "/tickets/delete",
  // validateRequest(matchSchemas.editMatchSchema),
  isAuthorized(matchEndpoints.DeleteTicketsAPI),
  matchFunctions.deleteTicket
);
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
