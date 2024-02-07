import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
  authorization: `Bearer ${API_TOKEN}`,
};

const fetchDataFromApi = async (url, params) => {
  try {
    const response = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default fetchDataFromApi;
