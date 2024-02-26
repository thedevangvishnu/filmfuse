import { useState, useEffect } from "react";
import fetchDataFromApi from "../utils/api";

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetchDataFromApi(url);
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
