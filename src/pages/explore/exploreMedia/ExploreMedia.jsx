import React, { useState, useEffect, useRef } from "react";

import fetchDataFromApi from "../../../utils/api";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MediaCard from "../../../components/mediaCard/MediaCard";

import "./ExploreMedia.styles.scss";

const ExploreMedia = ({ mediaType }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [media, setMedia] = useState([]);
  const [isMediaLoading, setIsMediaLoading] = useState(null);

  useEffect(() => {
    fetchMedia();
    console.log(media);
  }, [mediaType]);

  const fetchMedia = async () => {
    setIsMediaLoading(true);

    const data = await fetchDataFromApi(
      `/discover/${mediaType}?page=${pageNumber}`
    );

    if (data) {
      setIsMediaLoading(false);
      setMedia(data?.results);
      // pageNumber === 1
      //   ? setMedia(data?.results)
      //   : setMedia((prevMedia) => [...prevMedia, ...data?.results]);
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
        </div>

        <div className="mediaBody">
          <div className="mediaCards">
            {!isMediaLoading && (
              <>
                {media?.map((item) => {
                  return <MediaCard key={item?.id} item={item} />;
                })}
              </>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreMedia;
