import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

import useFetch from "../../../hooks/useFetch";

import LazyImage from "../../../components/lazyLoadImage/LazyImage";
import Genres from "../../../components/genres/Genres";

import "./HomeHeroBanner.styles.scss";
import { useNavigate } from "react-router-dom";

const HomeHeroBanner = () => {
  const [index, setIndex] = useState(0);
  const [item, setItem] = useState({});
  const [bg, setBg] = useState(0);

  const { data, isLoading } = useFetch("/movie/upcoming");

  const navigate = useNavigate();

  const media = useMemo(() => {
    return data?.results?.splice(0, 10);
  }, [data, isLoading]);

  useEffect(() => {
    loadInitialBanner();
  });

  const loadInitialBanner = () => {
    const bgUrl = BASE_URL + item?.backdrop_path;
    setBg(bgUrl);
    setItem(media?.[index]);
  };

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const formatDuration = (duration) => {
    const hours = (duration / 60).toFixed(0);
    const minutes = duration % 60;

    const totalDuration = `${hours}hrs ${minutes}mins`;
    return totalDuration;
  };

  return (
    <div className="homeHeroBanner">
      {!isLoading && (
        <>
          <div className="bannerItem">
            <LazyImage src={bg} />
            <div className="itemContent">
              <h3 className="title">{item?.original_title || item?.title}</h3>

              <div className="overview">
                <p>{item?.overview}</p>
              </div>

              <div className="metaData">
                <p className="date">
                  {dayjs(item?.release_date).format("YYYY")}
                </p>
                <div className="genresContainer">
                  <Genres genreIds={item?.genre_ids.map((genre) => genre)} />
                </div>
              </div>

              <div className="watchButton">
                <button onClick={() => navigate(`/movie/${item?.id}`)}>
                  Watch Trailer
                </button>
              </div>
            </div>
          </div>
          {/* <div className="bannerItems">
            {media?.map((item) => {
              const url = BASE_URL + item?.backdrop_path;
              return (
                <div className="bannerItem">
                  <LazyImage src={url} />
                  <div className="itemContent">
                    <h3 className="title">
                      {item?.original_title || item?.title}
                    </h3>

                    <div className="overview">
                      <p>{item?.overview}</p>
                    </div>

                    <div className="metaData">
                      <p className="date">
                        {dayjs(item?.release_date).format("YYYY")}
                      </p>
                      <div className="genresContainer">
                        <Genres
                          genreIds={item?.genre_ids.map((genre) => genre)}
                        />
                      </div>
                    </div>

                    <div className="watchButton">
                      <button onClick={() => navigate(`/movie/${item?.id}`)}>
                        Watch Trailer
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div> */}

          <div className="thumbnailItems"></div>
        </>
      )}
    </div>
  );
};

export default HomeHeroBanner;
