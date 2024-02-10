import React from "react";
import dayjs from "dayjs";

import "./DetailsBanner.styles.scss";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";

const DetailsBanner = ({ mediaType, id }) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const { data, isLoading } = useFetch(`/${mediaType}/${id}`);

  const backdropUrl = `${BASE_URL}${data?.backdrop_path}`;
  const posterUrl = `${BASE_URL}${data?.poster_path}`;

  return (
    <div className="detailsBanner">
      <div className="detailsBackdropContainer">
        <LazyImage src={`${backdropUrl}`} />
      </div>

      <ContentWrapper>
        {/* left section */}
        <div className="leftSection">
          <div className="posterContainer">
            <LazyImage src={posterUrl} />
          </div>
        </div>

        {/* right section */}
        <div className="rightSection">
          {/* title */}
          <div className="titleContent">
            <div className="title">
              <h3>
                {data?.title || data?.name}{" "}
                <span>({dayjs(data?.release_date).format("YYYY")})</span>
              </h3>
            </div>
            <div className="description">
              <p>{data?.tagline}</p>
            </div>
          </div>

          {/* genre */}
          <div className="genresContainer">
            <Genres genreIds={data?.genres.map((genre) => genre.id)} />
          </div>

          {/* rating */}
          <div className="ratingContainer">
            <CircleRating rating={data?.vote_average?.toFixed(1)} />
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DetailsBanner;
