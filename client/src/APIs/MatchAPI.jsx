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

export const editMatchAPI = async (match, token) => {
  try {
    const res = await client.put(
      `/match/edit`,
      { match },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

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

export const getAllTicketsAPI = async (token) => {
  try {
    const res = await client.get(`/tickets/get`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTicketAPI = async (token, _id) => {
  try {
    const res = await client.delete(`/tickets/delete`, {
      data: { _id },

      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
