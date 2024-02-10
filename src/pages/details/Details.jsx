import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import DetailsBanner from "./detailsBanner/DetailsBanner";

const Details = () => {
  const { mediaType, id } = useParams();

  useEffect(() => {
    console.log(mediaType);
    console.log(id);
  }, []);

  return (
    <div>
      <DetailsBanner mediaType={mediaType} id={id} />
    </div>
  );
};

export default Details;
