import React from "react";

import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../components/carousel/Carousel";

const Similar = ({ mediaType, id }) => {
  const title = mediaType === "movie" ? "Movies" : "TV Shows";
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/similar`);

  return (
    <div className="similarContainer section">
      <ContentWrapper>
        <p className="sectionTitle">{`Similar ${title}`}</p>
        <Carousel
          content={data?.results}
          isLoading={isLoading}
          endPoint={mediaType}
        />
      </ContentWrapper>
    </div>
  );
};

export default Similar;
