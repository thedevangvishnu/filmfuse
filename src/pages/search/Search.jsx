import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaXmark,
  FaBars,
  FaX,
  FaDeleteLeft,
  FaArrowLeft,
} from "react-icons/fa6";

import useFetch from "../../hooks/useFetch";

import { AppContext } from "../../context/AppContext";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import GenresTab from "../../components/genreTab/GenresTab";

import "./Search.styles.scss";

const Search = () => {
  const desiredGenres = [
    "Action",
    "Comedy",
    "Crime",
    "Drama",
    "Romance",
    "Thriller",
    "Horror",
  ];

  const { genres } = useContext(AppContext);
  const searchPageGenres = Object.values(genres).filter((genre) =>
    desiredGenres.includes(genre.name)
  );

  const navigate = useNavigate();
  const location = useLocation();

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
            <GenresTab key={genre.id} genre={genre.name} />
          ))}
        </div>

        {/* search result */}
      </ContentWrapper>
    </div>
  );
};

export default Search;
