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
        // each element in the results array doesn't have an endpoint property that can tell which mediaType it is. Add the endpoint to each item in the results array
        let modifiedResults;
        endpoints.forEach((endpoint, endpointIndex) => {
          if (resultsIndex === endpointIndex) {
            modifiedResults = results.map((item) => {
              return { ...item, endpoint: endpoint };
            });
          }
        });

        // sort the modifiedResults on the basis on popularity and extract first ten
        const sortedResults = modifiedResults
          .sort((a, b) => a.popularity > b.popularity)
          .splice(0, 10);
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
