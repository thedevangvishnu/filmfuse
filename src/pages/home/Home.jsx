import React from "react";

import HeroBanner from "../../components/heroBanner/HeroBanner";
import Trending from "../../components/trending/Trending";

import "./Home.styles.scss";

const Home = () => {
  return (
    <div className="homeComponent">
      <HeroBanner />
      <Trending />
      <div style={{ height: "2000px" }}></div>
    </div>
  );
};

export default Home;
