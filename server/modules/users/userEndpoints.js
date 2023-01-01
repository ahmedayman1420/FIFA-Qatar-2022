// ====== --- ====== > User module endpoints < ====== --- ====== //
const GetUserAPI = "User:GetUserAPI";
const ApproveUserAuthorityAPI = "User:ApproveUserAuthorityAPI";
const DeleteUserAPI = "User:DELETEUSERAPI";
const EditUserAPI = "User:EditUserAPI";

const userEndpoints = {
  GetUserAPI,
  ApproveUserAuthorityAPI,
  DeleteUserAPI,
  EditUserAPI,
};

// ====== --- ====== > Export user endpoints < ====== --- ====== //
module.exports = userEndpoints;
