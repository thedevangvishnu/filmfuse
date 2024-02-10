import { createContext, useState, useEffect } from "react";
import fetchDataFromApi from "../utils/api";

export const AppContext = createContext({
  genres: {},
});

export const AppProvider = ({ children }) => {
  const [genres, setGenres] = useState({});

  useEffect(() => {
    fetchGenres();
  }, []);

  const fetchGenres = async () => {
    const promises = [];
    const allGenres = {};
    const endPoints = ["movie", "tv"];

    endPoints.forEach((endPoint) => {
      const promise = fetchDataFromApi(`/genre/${endPoint}/list`);
      promises.push(promise);
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((genre) => (allGenres[genre.id] = genre));
    });
    setGenres(allGenres);
  };

  const value = { genres };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
