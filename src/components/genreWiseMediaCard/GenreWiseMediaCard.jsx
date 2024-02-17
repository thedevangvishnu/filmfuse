import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LazyImage from "../lazyLoadImage/LazyImage";

import "./GenreWiseMediaCard.styles.scss";

const GenreWiseMediaCard = ({ item }) => {
  const navigate = useNavigate();
  const [fullPosterUrl, setFullPosterUrl] = useState("");

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const posterPath = item?.poster_path;
    setFullPosterUrl(BASE_URL + posterPath);
  }, []);

  return (
    <div
      className="genreWiseMediaCard"
      onClick={() =>
        navigate(`/${item?.media_type || item?.endpoint}/${item?.id}`)
      }
    >
      <div className="posterContainer">
        <LazyImage src={fullPosterUrl} className="posterImg" />
      </div>
    </div>
  );
};

export default GenreWiseMediaCard;
