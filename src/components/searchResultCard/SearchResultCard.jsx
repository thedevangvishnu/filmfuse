import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../lazyLoadImage/LazyImage";

import FallbackPoster from "../../assets/images/no-poster.png";

import "./SearchResultCard.styles.scss";

const SearchResultCard = ({ item }) => {
  const navigate = useNavigate();

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div
      className="searchResultCard"
      onClick={() =>
        navigate(`/${item?.media_type || item?.endpoint}/${item?.id}`)
      }
    >
      <div className="posterContainer">
        <LazyImage
          src={
            item?.poster_path
              ? `${BASE_URL}/${item?.poster_path}`
              : FallbackPoster
          }
          className="posterImg"
        />
      </div>
    </div>
  );
};

export default SearchResultCard;
