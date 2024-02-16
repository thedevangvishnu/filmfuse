import React, { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import MediaCard from "../../../components/mediaCard/MediaCard";

import fetchDataFromApi from "../../../utils/api";

import "./ExploreMedia.styles.scss";

const ExploreMedia = ({ mediaType }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInitialData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchDataFromApi(`/discover/${mediaType}`);

      if (data) {
        setIsLoading(false);
        setData(data);
        setError(null);
      }

      setPageNumber((prevPage) => prevPage + 1);
    } catch (error) {
      setIsLoading(false);
      setData(null);
      setError("Error fetching data");
    }
  };

  const fetchDataForNextPage = async () => {
    setError(null);
    try {
      const response = await fetchDataFromApi(
        `/discover/${mediaType}?page=${pageNumber}`
      );

      if (data?.results) {
        setData({ ...data, results: [...data?.results, ...response?.results] });
      } else {
        setData(response);
      }

      setPageNumber((prevPage) => prevPage + 1);
    } catch (error) {
      setError("Error fetching data for next page");
    }
  };

  useEffect(() => {
    setData(null);
    setPageNumber(1);
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
          {isLoading && <p>Loading...</p>}
          {!isLoading && (
            <>
              {data?.results?.length > 0 ? (
                <InfiniteScroll
                  className="mediaCards"
                  dataLength={data?.results?.length}
                  hasMore={pageNumber <= data?.total_pages}
                  loader={<p>Loading...</p>}
                  next={fetchDataForNextPage}
                >
                  {data?.results?.map((item) => {
                    return (
                      <MediaCard
                        key={item?.id}
                        item={item}
                        mediaType={mediaType}
                      />
                    );
                  })}
                </InfiniteScroll>
              ) : (
                <p>Sorry, no results found</p>
              )}
            </>
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default ExploreMedia;
