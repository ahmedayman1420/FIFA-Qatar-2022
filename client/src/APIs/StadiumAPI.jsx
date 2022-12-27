// ===== --- ===== ### Axios ### ===== --- ===== //
import axios from "axios";

// ===== --- ===== ### JWT-Decode ### ===== --- ===== //
import jwt_decode from "jwt-decode";

// ===== --- ===== ### Base-URL ### ===== --- ===== //
const baseURL = "http://localhost:5000/";

const client = axios.create({
  baseURL,
});

// ===== --- ===== ### Stadium-APIs ### ===== --- ===== //
export const createStadiumAPI = async (stadium, token) => {
  try {
    console.log({ stadium });
    console.log({ token });
    alert("HEREE");
    const res = await client.post(`/stadium/create`, stadium, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
