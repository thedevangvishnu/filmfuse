import { useState, useEffect } from "react";
import fetchDataFromApi from "../utils/api";

const useFetchAndCombine = (genreId) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(null);

  const fetchDataForMovieAndTv = async () => {
    setIsLoading(true);

    try {
      const promises = [];
      const endpoints = ["movie", "tv"];
      const media = [];

      endpoints.forEach((endpoint) => {
        const promise = fetchDataFromApi(
          `/discover/${endpoint}?with_genres=${genreId}`
        );
        promises.push(promise);
      });

      const response = await Promise.all(promises);

      response.forEach(({ results }, resultsIndex) => {
        let modifiedResults;
        endpoints.forEach((endpoint, endpointIndex) => {
          if (resultsIndex === endpointIndex) {
            modifiedResults = results.map((item) => {
              return { ...item, endpoint: endpoint };
            });
          }
        });

        const sortedResults = modifiedResults.sort(
          (a, b) => a.popularity > b.popularity
        );
        sortedResults.forEach((item) => media.push(item));
      });
      setIsLoading(false);
      setData({ results: media });
    } catch (error) {
      setIsLoading(false);
      setData(null);
      console.log(`Error fetching data: ${error}`);
    }
  };

  useEffect(() => {
    fetchDataForMovieAndTv();
  }, [genreId]);

  return { data, isLoading };
};

export default useFetchAndCombine;
