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

  const infiniteScrollContainer = useRef();

  useEffect(() => {
    fetchMedia();
  }, [mediaType, pageNumber]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const fetchMedia = async () => {
    setIsMediaLoading(true);

    const data = await fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNumber}`
    );

    if (data) {
      setIsMediaLoading(false);
      pageNumber === 1
        ? setMedia(data?.results)
        : setMedia((prevMedia) => [...prevMedia, ...data?.results]);
      // setPageNumber((prevPage) => prevPage + 1);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPageNumber((prevPage) => prevPage + 1);
    }
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
