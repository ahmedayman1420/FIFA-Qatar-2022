// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ===== --- ===== ### Base-URL ### ===== --- ===== //
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ===== --- ===== ### Mtch-APIs ### ===== --- ===== //
export const createMatchAPI = async (match, token) => {
  try {
    const res = await client.post(`/match/create`, match, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getHomeMatchesAPI = async () => {
  try {
    const res = await client.get(`/home-matches/get`);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllMatchesAPI = async () => {
  try {
    const res = await client.get(`/matches/get`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
