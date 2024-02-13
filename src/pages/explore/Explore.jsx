import React from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import ExploreBanner from "./exploreBanner/ExploreBanner";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./Explore.styles.scss";
import Carousel from "../../components/carousel/Carousel";

const Explore = () => {
  const { mediaType } = useParams();

  const { data, isLoading } = useFetch(`/discover/${mediaType}?page=1`);

  const mediaTitle = mediaType === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="exploreContainer">
      <ExploreBanner mediaType={mediaType} />
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
