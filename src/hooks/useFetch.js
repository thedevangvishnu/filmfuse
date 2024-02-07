import { useState, useEffect } from "react";
import fetchDataFromApi from "../utils/api";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchDataFromApi(url);
        console.log(response);
        setIsLoading(false);
        setData(response);
      } catch (error) {
        setIsLoading(false);
        setError("Something went wrong");
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
};

export default useFetch;
