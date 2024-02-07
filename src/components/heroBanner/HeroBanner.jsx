import React, { useState, useEffect } from "react";

import LazyImage from "../lazyLoadImage/LazyImage";
import ContentWrapper from "../contentWrapper/ContentWrapper";

import useFetch from "../../hooks/useFetch";

import "./HeroBanner.styles.scss";

const HeroBanner = () => {
  // fetch a random movie from movie upcoming and take out the backdrop_url and combine it with the /configuration url and set to backgroundUrl state variable

  const [bgUrl, setBgUrl] = useState("");

  const { isLoading, data } = useFetch("/movie/upcoming");

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const bgFullPath =
      BASE_URL +
      data?.results?.[Math.floor(Math.random() * data.results.length)]
        ?.backdrop_path;
    setBgUrl(bgFullPath);
  }, [data]);

  return (
    <div className="heroBanner">
      {/* banner img */}
      {!isLoading && (
        <div className="bannerContainer">
          <LazyImage src={bgUrl} />
        </div>
      )}
      {/* content */}
      <ContentWrapper>
        <h1 className="heroTitle">FilmFuse</h1>
        <p className="heroDescription">
          A hub for your favourite Movies and TV shows. Explore now!
        </p>

        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            className="searchInput"
          />
          <button className="searchButton">Search</button>
        </div>
      </ContentWrapper>

      <div className="overlayContainer"></div>
    </div>
  );
};

export default HeroBanner;
