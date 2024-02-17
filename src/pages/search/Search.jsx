import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaXmark,
  FaBars,
  FaX,
  FaDeleteLeft,
  FaArrowLeft,
} from "react-icons/fa6";

import useFetch from "../../hooks/useFetch";
import useFetchAndCombine from "../../hooks/useFetchAndCombine";

import { AppContext } from "../../context/AppContext";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import GenresTab from "../../components/genreTab/GenresTab";

import "./Search.styles.scss";

const Search = () => {
  const [searchPageGenres, setSearchPageGenres] = useState([]);
  const [currentGenreId, setCurrentGenreId] = useState(null);

  const { genres } = useContext(AppContext);
  // console.log(genres);

  const { data, isLoading } = useFetchAndCombine(currentGenreId);
  console.log(data);

  const navigate = useNavigate();
  const location = useLocation();

  const populateGenresForSearchPage = () => {
    const desiredGenres = [
      "Action",
      "Comedy",
      "Crime",
      "Drama",
      "Romance",
      "Thriller",
      "Documentary",
    ];
    const allGenres = Object.values(genres).filter((genre) =>
      desiredGenres.includes(genre.name)
    );
    setSearchPageGenres(allGenres);
  };

  useEffect(() => {
    populateGenresForSearchPage();
  }, []);

  useEffect(() => {
    setCurrentGenreId(searchPageGenres[0]?.id);
  }, [searchPageGenres]);

  const handleGoBack = () => {
    if (location.state && location.state.source) {
      navigate(location.state.source);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="searchPage">
      <ContentWrapper>
        <div className="closeIconContainer" onClick={handleGoBack}>
          <FaArrowLeft className="arrowIcon icon" />
        </div>

        {/* search container */}
        <div className="searchContainer">
          <input type="text" placeholder="Search movies or tv shows" />
          <span>
            <FaDeleteLeft className="closeIcon icon" />
          </span>
        </div>

        {/* genres tabs */}
        <div className="genresTabsContainer">
          {searchPageGenres.map((genre) => (
            <GenresTab
              key={genre.id}
              genre={genre.name}
              onTabClick={() => setCurrentGenreId(genre.id)}
            />
          ))}
        </div>

        {/* search result */}
      </ContentWrapper>
    </div>
  );
};

export default Search;
