import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const TopRated = () => {
  const [endPoint, setEndPoint] = useState("movie");

  const { data, isLoading } = useFetch(`/${endPoint}/top_rated`);

  const onTabChangeHandler = (tab) => {
    setEndPoint(tab === "Movies" ? "movie" : "tv");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Top Rated</span>
        <SwitchTabs
          tabs={["Movies", "TV shows"]}
          onTabChange={onTabChangeHandler}
        />
      </ContentWrapper>

      <Carousel
        content={data?.results}
        isLoading={isLoading}
        endPoint={endPoint}
      />
    </div>
  );
};

export default TopRated;
