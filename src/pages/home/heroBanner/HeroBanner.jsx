import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import LazyImage from "../../../components/lazyLoadImage/LazyImage";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

import "./HeroBanner.styles.scss";

const HeroBanner = () => {
  // fetch a random movie from movie upcoming and take out the backdrop_url and combine it with the /configuration url and set to backgroundUrl state variable

  const [bgUrl, setBgUrl] = useState("");
  const [query, setQuery] = useState("");
  const [queryError, setQueryError] = useState(null);
  const navigate = useNavigate();
  const { data, isLoading } = useFetch("/movie/upcoming");

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    const bgFullPath =
      BASE_URL +
      data?.results?.[Math.floor(Math.random() * data.results.length)]
        ?.backdrop_path;
    setBgUrl(bgFullPath);
  }, [data]);

  const onKeyUpHandler = (event) => {
    if (event.target.value !== "" && event.key === "Enter") {
      // navigate to search page
      navigate(`/search/${query}`);
    } else {
      setQueryError("Please enter some valid input!");
      setTimeout(() => {
        setQueryError(null);
      }, 3000);
    }
  };

  const onClickHandler = () => {
    if (query.length > 0) {
      navigate(`/search/${query}`);
    } else {
      setQueryError("Please enter some valid input!");
      setTimeout(() => {
        setQueryError(null);
      }, 3000);
    }
  };

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
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyUp={onKeyUpHandler}
          />
          <button className="searchButton" onClick={onClickHandler}>
            Search
          </button>
        </div>

        <div className="errorContainer">
          {queryError && <p>{queryError}</p>}
        </div>
      </ContentWrapper>

      <div className="overlayContainer"></div>
    </div>
  );
};

export default HeroBanner;
