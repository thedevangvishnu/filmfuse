import React, { useState, useEffect, useRef } from "react";

import fetchDataFromApi from "../../../utils/api";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MediaCard from "../../../components/mediaCard/MediaCard";

import "./ExploreMedia.styles.scss";

const ExploreMedia = ({ mediaType }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [media, setMedia] = useState([]);
  const [isMediaLoading, setIsMediaLoading] = useState(null);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    setIsMediaLoading(true);
    setError(null);

    try {
      const data = await fetchDataFromApi(
        `/discover/${mediaType}?page=${pageNumber}`
      );

      if (data) {
        setIsMediaLoading(false);
        setMedia(data?.results);
        setError(null);
      }
    } catch (error) {
      setIsMediaLoading(false);
      setMedia([]);
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [mediaType]);

  const mediaTitle = mediaType === "movie" ? "Movies" : "TV Shows";

  return (
    <div className="exploreMediaContainer">
      <ContentWrapper>
        <div className="mediaHead">
          <div className="mediaTitle">
            <h2>Explore {mediaTitle}</h2>
          </div>
        </div>

        <div className="mediaBody">
          <div className="mediaCards">
            {media?.map((item) => {
              return (
                <MediaCard key={item?.id} item={item} mediaType={mediaType} />
              );
            })}
            {isMediaLoading && <p>Loading... </p>}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreMedia;
