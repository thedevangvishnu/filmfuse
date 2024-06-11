import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";
import dayjs from "dayjs";

import "./Carousel.styles.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import LazyImage from "../lazyLoadImage/LazyImage";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import FallbackPoster from "../../assets/images/no-poster.png";

const Carousel = ({ content, isLoading, endPoint }) => {
  const carouselItemsContainer = useRef();
  const navigate = useNavigate();

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const scrollContainer = (direction) => {
    const container = carouselItemsContainer.current;
    const scrollWidth = container.offsetWidth + 20;
    container.scrollBy({
      left: direction === "left" ? -scrollWidth : scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="carouselContainer">
      <ContentWrapper>
        <div
          className="leftArrowContainer"
          onClick={() => scrollContainer("left")}
        >
          <FaCircleChevronLeft className="arrow" />
        </div>

        <div
          className="rightArrowContainer"
          onClick={() => scrollContainer("right")}
        >
          <FaCircleChevronRight className="arrow" />
        </div>
        <div className="carouselItems" ref={carouselItemsContainer}>
          {!isLoading &&
            content?.map((item) => {
              const posterPath = item?.poster_path;
              const fullPosterUrl = item?.poster_path
                ? BASE_URL + posterPath
                : FallbackPoster;

              return (
                <div
                  key={item?.id}
                  className="carouselItem"
                  onClick={() =>
                    navigate(`/${item?.media_type || endPoint}/${item?.id}`)
                  }
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
            })}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
