import React from "react";

import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";

import "./Home.styles.scss";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import HomeHeroBanner from "./homeHero/HomeHeroBanner";

const Home = () => {
  return (
    <div className="homeComponent">
      <HomeHeroBanner />
      {/* <HeroBanner /> */}
      <Trending />
      <Popular />
      <TopRated />
    </div>
  );
};

export default Home;
