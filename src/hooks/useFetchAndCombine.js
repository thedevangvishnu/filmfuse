import { useState, useEffect } from "react";
import fetchDataFromApi from "../utils/api";

const useFetchAndCombine = (genreId) => {
  // fetch normal genre-wise data for movie and tv

  const [data, setData] = useState([]);

  const fetchDataForMovieAndTv = async () => {
    const promises = [];
    const endpoints = ["movie", "tv"];

    endpoints.forEach((endpoint) => {
      const promise = fetchDataFromApi(
        `/discover/${endpoint}?with_genres=${genreId}`
      );
      promises.push(promise);
    });

    const data = await Promise.all(promises);
    console.log(data);
  };

  useEffect(() => {
    fetchDataForMovieAndTv();
  }, [genreId]);
};

export default useFetchAndCombine;
