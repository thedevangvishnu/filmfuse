import React from "react";

import HeroBanner from "../../components/heroBanner/HeroBanner";

import "./Home.styles.scss";

const Home = () => {
  return (
    <div className="homeComponent">
      <HeroBanner />
      <div style={{ height: "2000px" }}></div>
    </div>
  );
};

export default Home;
