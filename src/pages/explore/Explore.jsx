import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import ExploreBanner from "./exploreBanner/ExploreBanner";
import ExploreMedia from "./exploreMedia/ExploreMedia";

import "./Explore.styles.scss";

const Explore = () => {
  const { mediaType } = useParams();

  return (
    <div className="exploreContainer">
      <ExploreBanner mediaType={mediaType} />
      <ExploreMedia mediaType={mediaType} />
      {/* <ContentWrapper>
        <div className="exploreHead">
          <div className="exploreTitle">
            <h2>Explore {mediaTitle}</h2>
          </div>

          <div className="filterSortContainer">
            <div className="filterContainer filterSort"></div>
          </div>
        </div>

        <div className="exploreBody">
          {!isLoading && (
            <Carousel
              content={data?.results}
              isLoading={isLoading}
              endPoint={mediaType}
            />
          )}
        </div>
      </ContentWrapper> */}
    </div>
  );
};

export default Explore;
