// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const stadiumsFunctions = require("../controller/stadium-control");
const stadiumsSchemas = require("../joi/stadium-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const stadiumEndpoints = require("../stadiumEndpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");

// ====== --- ====== > Stadium Routes < ====== --- ====== //

// create stadium api
router.post(
  "/stadium/create",
  validateRequest(stadiumsSchemas.createStadiumSchema),
  isAuthorized(stadiumEndpoints.CreateStadiumAPI),
  stadiumsFunctions.craeteStadium
);

// get stadium api
router.get("/stadiums/get", stadiumsFunctions.getStadiums);

// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
