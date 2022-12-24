// ====== --- ====== > Modules endpoints < ====== --- ====== //
const Rbac = require("easy-rbac");
const userEndpoints = require("../../modules/users/userEndpoints");
const roles = require("../Enum/roles");
// ====== --- ====== > Roles policies < ====== --- ====== //
const fanPolicies = [userEndpoints.SearchUserByNameOrEmailAPI];
const managerPolicies = [];
const AdminPolicies = [];

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
