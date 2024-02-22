import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

import { GoDotFill } from "react-icons/go";
import Genres from "../../../components/genres/Genres";

import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import {
  FaPlay,
  FaAngleRight,
  FaAngleLeft,
  FaLessThanEqual,
} from "react-icons/fa";

import useFetch from "../../../hooks/useFetch";

import "./ExploreBanner.styles.scss";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

const BASE_URL = "https://image.tmdb.org/t/p/original";

const ExploreBanner = ({ mediaType }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaItem, setMediaItem] = useState({});
  const [bg, setBg] = useState("");
  const [language, setLanguage] = useState("");

  const bannerContainer = useRef();

  const { data, isLoading } = useFetch(`/${mediaType}/popular`);

  const media = useMemo(() => {
    return data?.results
      ?.sort((a, b) => a.popularity > b.popularity)
      ?.splice(0, 5);
  }, [data]);

  useEffect(() => {
    setMediaItem(media?.[mediaIndex]);
    loadItemBanner();
    chooseLanguage();
  }, [data, mediaIndex, mediaItem]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (mediaIndex === media?.length - 1) {
        setMediaIndex(0);
      } else {
        setMediaIndex((prevIndex) => prevIndex + 1);
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [mediaIndex]);

  const loadItemBanner = () => {
    const bgUrl = BASE_URL + mediaItem?.backdrop_path;
    setBg(bgUrl);
  };

  const chooseLanguage = () => {
    switch (mediaItem?.original_language) {
      case "es":
        setLanguage("Spanish");
        break;
      case "fr":
        setLanguage("French");
        break;
      case "hi":
        setLanguage("Hindi");
        break;
      default:
        setLanguage("English");
    }
  };

  const handleLeftArrow = () => {
    if (mediaIndex === 0) {
      setMediaIndex(media?.length - 1);
    } else {
      setMediaIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRightArrow = () => {
    if (mediaIndex === media?.length - 1) {
      setMediaIndex(0);
    } else {
      setMediaIndex((prevIndex) => prevIndex + 1);
    }
  };

  // const scrollContainer = (direction) => {
  //   const container = bannerContainer.current;
  //   const scrollWidth =
  //     direction === "left"
  //       ? container.scrollLeft - container.offsetWidth
  //       : container.scrollLeft + container.offsetWidth;

  //   container.scrollTo({
  //     left: scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="exploreBannerContainer">
      <div className="leftArrowContainer" onClick={handleLeftArrow}>
        <FaCircleChevronLeft className="arrow" />
      </div>

      <div className="rightArrowContainer" onClick={handleRightArrow}>
        <FaCircleChevronRight className="arrow" />
      </div>

      {!isLoading && (
        <>
          <div className="bannerContainer">
            <LazyImage src={bg} />
            <div className="itemContent">
              <h3 className={`title `}>
                {mediaItem?.original_title ||
                  mediaItem?.title ||
                  mediaItem?.name}
              </h3>

              <div className={`overview `}>
                <p>{mediaItem?.overview}</p>
              </div>

              <div className={`metaData `}>
                <p className="metaItem">
                  {dayjs(mediaItem?.release_date).format("YYYY")}
                </p>
                <div className="dot"></div>

                <p className="metaItem">{language}</p>
                <div className="dot"></div>

                <p className="metaItem">{!mediaItem?.adult ? "U/A" : "A"}</p>
              </div>

              <div className={`genresContainer`}>
                <Genres
                  genreIds={mediaItem?.genre_ids.map((genre) => genre)}
                  hasbars="true"
                />
              </div>

              <div
                className="watchButton"
                onClick={() => navigate(`/${mediaType}/${mediaItem?.id}`)}
              >
                <span className="icon">
                  <FaPlay />
                </span>
                <p>Watch Now</p>
              </div>
            </div>
          </div>

          <div className="dotsContainer">
            {media?.map((item, index) => (
              <GoDotFill
                key={item?.id}
                className={`dot ${index === mediaIndex ? "activeDot" : ""}`}
              />
            ))}
          </div>
          {/* 
          <div className="overlayContainer"></div> */}
        </>
      )}
    </div>
  );
};

export default ExploreBanner;
