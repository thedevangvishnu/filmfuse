import React, { useState, useEffect, useRef } from "react";

import fetchDataFromApi from "../../../utils/api";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MediaCards from "../../../components/mediaCard/MediaCards";

import "./ExploreMedia.styles.scss";
import { preprocess } from "zod";

const ExploreMedia = ({ mediaType }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [media, setMedia] = useState([]);
  const [isMediaLoading, setIsMediaLoading] = useState(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  const infiniteScrollContainer = useRef();

  useEffect(() => {
    fetchInitialData();
  }, [mediaType]);

  const fetchInitialData = async () => {
    setIsMediaLoading(true);

    const data = await fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNumber}`
    );

    if (data) {
      setIsMediaLoading(false);
      setMedia(data?.results);
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (true) {
      fetchDataForNextPage();
    }
  }, [pageNumber]);

  const fetchDataForNextPage = async () => {
    const data = await fetchDataFromApi(
      `/discover/${mediaType}?page=${nextPage}`
    );

    if (data) {
      setMedia((prevMedia) => [...prevMedia, ...data?.results]);
      // Update page number after fetching data
    }
    setPageNumber((prevPage) => prevPage + 1);
  };

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
          <div
            className="infiniteScrollContainer"
            ref={infiniteScrollContainer}
          >
            {!isMediaLoading && (
              <MediaCards
                content={media}
                isLoading={isMediaLoading}
                endpoint={mediaType}
              />
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreMedia;
