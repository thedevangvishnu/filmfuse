import React, { useContext } from "react";
import {
  FaXmark,
  FaBars,
  FaX,
  FaDeleteLeft,
  FaArrowLeft,
} from "react-icons/fa6";

import { AppContext } from "../../context/AppContext";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./Search.styles.scss";

const Search = () => {
  const searchGenres = [
    "Action",
    "Comedy",
    "Crime",
    "Drama",
    "Romance",
    "Thriller",
    "Horror",
  ];

  return (
    <div className="searchPage">
      <ContentWrapper>
        <div className="closeIconContainer">
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
        <div className="genresTabsContainer"></div>

        {/* search result */}
      </ContentWrapper>
    </div>
  );
};

export default Search;
