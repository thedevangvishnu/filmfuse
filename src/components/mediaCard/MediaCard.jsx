import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import LazyImage from "../lazyLoadImage/LazyImage";
import Genres from "../genres/Genres";
import CircleRating from "../circleRating/CircleRating";

import "./MediaCard.styles.scss";

const MediaCard = ({ item }) => {
  const navigate = useNavigate();
  const [fullPosterUrl, setFullPosterUrl] = useState("");

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const posterPath = item?.poster_path;
    setFullPosterUrl(BASE_URL + posterPath);
  }, []);

  return (
    <div
      className="mediaCardContainer"
      onClick={() => navigate(`/${item?.media_type || endPoint}/${item?.id}`)}
    >
      <div className="posterContainer">
        <LazyImage src={fullPosterUrl} className="posterImg" />
        <Genres genreIds={item?.genre_ids.slice(0, 2)} />
      </div>

      <div className="ratingContainer">
        <CircleRating rating={item?.vote_average.toFixed(1)} />
      </div>

      <div className="textContainer">
        {/* title */}
        <h4 className="title">{item?.title || item?.name}</h4>
        <p className="date">
          {dayjs(item?.release_date || item?.first_air_date).format(
            "MMM D, YYYY"
          )}
        </p>
      </div>
    </div>
  );
};

export default MediaCard;
