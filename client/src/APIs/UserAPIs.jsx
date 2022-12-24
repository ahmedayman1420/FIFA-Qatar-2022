// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ===== --- ===== ### Base-URL ### ===== --- ===== //
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ===== --- ===== ### User-APIs ### ===== --- ===== //
export const signUpAPI = async (user) => {
  try {
    const res = await client.post(`user/signup`, user);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const signInAPI = async (user) => {
  try {
    const res = await client.post(`user/signin`, {
      username: user.username,
      password: user.password,
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const ContinueWithGoogleAPI = async (token) => {
  try {
    var decoded = jwt_decode(token);
    console.log({ decoded });
    const res = await client.post(`google`, {
      email: decoded.email,
      name: decoded.name,
      pic: decoded.picture,
    });
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};
