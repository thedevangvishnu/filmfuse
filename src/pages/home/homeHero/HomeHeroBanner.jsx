import React, { useState, useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaPlay, FaAngleRight, FaAngleLeft } from "react-icons/fa";

import useFetch from "../../../hooks/useFetch";

import LazyImage from "../../../components/lazyLoadImage/LazyImage";
import Genres from "../../../components/genres/Genres";

import "./HomeHeroBanner.styles.scss";

const BASE_URL = "https://image.tmdb.org/t/p/original";

const HomeHeroBanner = () => {
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState({});
  const [language, setLanguage] = useState("");
  const [bg, setBg] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const thumbnailItems = useRef();

  const { data, isLoading } = useFetch("/movie/upcoming");

  const navigate = useNavigate();

  const media = useMemo(() => {
    return data?.results?.splice(0, 10);
  }, [data]);

  useEffect(() => {
    setItem(media?.[index]);
    loadItemBanner();
  }, [data, index, item]);

  useEffect(() => {
    chooseLanguage();
  }, [index]);

  //   useEffect(() => {
  //     setShowAnimation(true);
  //   }, [index]);

  const chooseLanguage = () => {
    switch (item?.original_language) {
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

  const loadItemBanner = () => {
    const bgUrl = BASE_URL + item?.backdrop_path;
    setBg(bgUrl);
  };

  const handleLeftArrow = () => {
    if (index === 0) {
      setIndex(media?.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleRightArrow = () => {
    if (index === media?.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  const scrollThumbnails = (direction) => {
    const container = thumbnailItems.current;

    const scrollWidth = container.offsetWidth + 60;

    container.scrollBy({
      left: direction === "left" ? -scrollWidth : scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="homeHeroBanner">
      {!isLoading && (
        <>
          <div className="bannerItem">
            <LazyImage src={bg} />
            <div className="itemContent">
              <h3 className={`title ${showAnimation ? "animate" : null}`}>
                {item?.original_title || item?.title}
              </h3>

              <div className={`overview ${showAnimation ? "animate" : null}`}>
                <p>{item?.overview}</p>
              </div>

              <div className={`metaData ${showAnimation ? "animate" : null}`}>
                <p className="metaItem">
                  {dayjs(item?.release_date).format("YYYY")}
                </p>
                <div className="dot"></div>

                <p className="metaItem">{language}</p>
                <div className="dot"></div>

                <p className="metaItem">{!item?.adult ? "U/A" : "A"}</p>
              </div>

              <div
                className={`genresContainer ${
                  showAnimation ? "animate" : null
                }`}
              >
                <Genres
                  genreIds={item?.genre_ids.map((genre) => genre)}
                  hasbars="true"
                />
              </div>

              <div
                className="watchButton"
                onClick={() => navigate(`/movie/${item?.id}`)}
              >
                <span className="icon">
                  <FaPlay />
                </span>
                <p>Watch Now</p>
              </div>
            </div>
          </div>

          <div className="arrows">
            <div className="leftArrow icon" onClick={handleLeftArrow}>
              <FaAngleLeft />
            </div>
            <div className="rightArrow icon" onClick={handleRightArrow}>
              <FaAngleRight />
            </div>
          </div>

          <div className="thumbnails">
            <div className="thumbnailItems" ref={thumbnailItems}>
              {media?.map((item) => {
                return (
                  <div className="thumbnailItem">
                    <LazyImage src={BASE_URL + item?.poster_path} />
                  </div>
                );
              })}
            </div>

            <div
              className="thumbnailLeftArrow"
              onClick={() => scrollThumbnails("left")}
            >
              <FaAngleLeft />
            </div>

            <div
              className="thumbnailRightArrow"
              onClick={() => scrollThumbnails("right")}
            >
              <FaAngleRight />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeHeroBanner;
