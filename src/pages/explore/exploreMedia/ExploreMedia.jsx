import React from "react";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../components/carousel/Carousel";

const ExploreMedia = ({ mediaType }) => {
  const { data, isLoading } = useFetch(`/discover/${mediaType}?page=1`);
  const mediaTitle = mediaType === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="exploreMediaContainer">
      <ContentWrapper>
        <div className="mediaHead">
          <div className="mediaTitle">
            <h2>Explore {mediaTitle}</h2>
          </div>

          <div className="filterSortContainer">
            <div className="filterContainer filterSort"></div>
          </div>
        </div>

        <div className="mediaBody">
          {!isLoading && (
            <Carousel
              content={data?.results}
              isLoading={isLoading}
              endPoint={mediaType}
            />
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreMedia;
