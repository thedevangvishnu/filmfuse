import React from "react";

import useFetch from "../../../hooks/useFetch";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Carousel from "../../../components/carousel/Carousel";

const Recommended = ({ mediaType, id }) => {
  const { data, isLoading } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <div className="recommendedContainer section">
      <ContentWrapper>
        <p className="sectionTitle">Recommendations</p>
        {data?.results?.length === 0 ? (
          <p className="notAvailable">No recommended ${title} found</p>
        ) : (
          <Carousel
            content={data?.results}
            isLoading={isLoading}
            endPoint={mediaType}
          />
        )}
      </ContentWrapper>
    </div>
  );
};

export default Recommended;
