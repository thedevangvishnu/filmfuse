import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailsBanner from "./detailsBanner/DetailsBanner";
import useFetch from "../../hooks/useFetch";

const Details = () => {
  const { mediaType, id } = useParams();

  const { data, isLoading } = useFetch(`/${mediaType}/${id}/credits`);

  return (
    <div>
      <DetailsBanner mediaType={mediaType} id={id} crew={data?.crew} />
    </div>
  );
};

export default Details;
