// ====== --- ====== > Import Modules & Variables Declaration < ====== --- ====== //
const express = require("express");
const router = express.Router();
const userFunctions = require("../controller/user-control");
const userSchemas = require("../joi/user-joi");
const validateRequest = require("../../../Common/Middlewares/requestValidation");
const userEndpoints = require("../userEndpoints");
const isAuthorized = require("../../../Common/Middlewares/isAuthorized");
/*
//==// require express to create sub-object that will used to contains user apis
//==// userFunctions: it's an object that contains all user apis logic
//==// userSchemas: it's an object that contains all user apis schemas
//==// validateRequest: it's a function that used validate schema with sent request
*/

// ====== --- ====== > User Routes < ====== --- ====== //

// Hello dev api
router.get("/", (req, res) => {
  res.send("Hello my best developer, All is well!");
});

// signup api
router.post(
  "/user/signup",
  validateRequest(userSchemas.signupSchema),
  userFunctions.signUp
);

// signin api
router.post(
  "/user/signin",
  validateRequest(userSchemas.signinSchema),
  userFunctions.signIn
);

// google api
router.post(
  "/google",
  validateRequest(userSchemas.googleSigninSchema),
  userFunctions.googleSignIn
);

// get all users api
router.get(
  "/user/get",
  validateRequest(userSchemas.getUserSchema),
  isAuthorized(userEndpoints.GetUserAPI),
  userFunctions.getAllUsers
);

// Approve User Authority
router.put(
  "/user/approve/:id",
  validateRequest(userSchemas.approveUserAuthoritySchema),
  isAuthorized(userEndpoints.ApproveUserAuthorityAPI),
  userFunctions.approveUserAuthority
);

// Delete User
router.delete(
  "/user/delete/:id",
  validateRequest(userSchemas.deleteUserSchema),
  isAuthorized(userEndpoints.DeleteUserAPI),
  userFunctions.deleteUser
);

// Edit User
router.put(
  "/user/edit",
  // validateRequest(userSchemas.deleteUserSchema),
  isAuthorized(userEndpoints.DeleteUserAPI),
  userFunctions.editUser
);
// ====== --- ====== > Export Module < ====== --- ====== //
module.exports = router;
