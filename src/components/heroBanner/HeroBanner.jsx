import React, { useState, useEffect } from "react";

import useFetch from "../../hooks/useFetch";

import "./HeroBanner.styles.scss";

const HeroBanner = () => {
  // fetch a random movie from movie upcoming and take out the backdrop_url and combine it with the /configuration url and set to backgroundUrl state variable

  const [bgUrl, setBgUrl] = useState("");

  const { data } = useFetch("/movie/upcoming");

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
      <div className="bannerContainer">
        <img src={bgUrl} alt="Backdrop Poster" />
      </div>
      {/* content */}
    </div>
  );
};

export default HeroBanner;
