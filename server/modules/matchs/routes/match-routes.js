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

// edit ticket api
// router.put("/match/ticket", matchFunctions.updateTicket);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
