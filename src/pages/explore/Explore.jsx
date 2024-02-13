import React from "react";
import { useParams } from "react-router-dom";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";

import "./Explore.styles.scss";

const Explore = () => {
  const { mediaType } = useParams();
  const mediaTitle = mediaType === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="exploreContainer">
      <div style={{ height: "100px" }}></div>
      <ContentWrapper>
        <div className="exploreHead">
          <div className="exploreTitle">
            <h2>Explore {mediaTitle}</h2>
          </div>

          <div className="filterSortContainer">
            {/* filter by genres */}
            <div className="filterContainer filterSort"></div>

            {/* sort */}
          </div>
        </div>

        <div className="exploreBody"></div>
      </ContentWrapper>
    </div>
  );
};

export default Explore;
