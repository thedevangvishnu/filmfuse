import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import OfficialVideos from "./videos/OfficialVideos";

import "./Details.styles.scss";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data: mediaData, isLoading: mediaDataLoading } = useFetch(
    `/${mediaType}/${id}`
  );
  const { data: creditsData, isLoading: creditsDataLoading } = useFetch(
    `/${mediaType}/${id}/credits`
  );
  const { data: videos, isLoading: videosLoading } = useFetch(
    `/${mediaType}/${id}/videos`
  );

  return (
    <div className="detailsContainer">
      <DetailsBanner
        data={mediaData}
        crew={creditsData?.crew}
        videos={videos}
        videosLoading={videosLoading}
      />
      <Cast cast={creditsData?.cast} castLoading={creditsDataLoading} />
      <OfficialVideos videos={videos} videosLoading={videosLoading} />
      {/* <Related /> */}
      {/* <Recommended /> */}
    </div>
  );
};

export default Details;
