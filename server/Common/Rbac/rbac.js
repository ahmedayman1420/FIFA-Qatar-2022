// ====== --- ====== > Modules endpoints < ====== --- ====== //
const Rbac = require("easy-rbac");
const matchEndpoints = require("../../modules/matchs/matchEndpoints");
const stadiumEndpoints = require("../../modules/stadiums/stadiumEndpoints");
const userEndpoints = require("../../modules/users/userEndpoints");
const roles = require("../Enum/roles");
// ====== --- ====== > Roles policies < ====== --- ====== //
const fanPolicies = [];
const managerPolicies = [
  stadiumEndpoints.CreateStadiumAPI,
  matchEndpoints.CreateMatchAPI,
];
const AdminPolicies = [
  userEndpoints.GetUserAPI,
  userEndpoints.ApproveUserAuthorityAPI,
  userEndpoints.DeleteUserAPI,
];

// ====== --- ====== > Match Between Roles & Them EndPoints < ====== --- ====== //
const opts = {
  [roles.FAN]: {
    can: fanPolicies,
  },
  [roles.MANAGER]: {
    can: managerPolicies,
    inherits: [roles.FAN],
  },
  [roles.ADMIN]: {
    can: AdminPolicies,
    inherits: [roles.FAN, roles.MANAGER],
  },
};

// ====== --- ====== > Create rbac of user module < ====== --- ====== //
userRbac = Rbac.create(opts);

// ====== --- ====== > Exports userRabac < ====== --- ====== //
module.exports = userRbac;
