import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../../hooks/useFetch";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, isLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner mediaType={mediaType} id={id} crew={data?.crew} />
      <Cast cast={data?.cast} castLoading={isLoading} />
      {/* <OfficialVideos /> */}
      {/* <Related /> */}
      {/* <Recommended /> */}
    </div>
  );
};

export default Details;
