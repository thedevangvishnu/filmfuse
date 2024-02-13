import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";

import useFetch from "../../../hooks/useFetch";

import "./ExploreBanner.styles.scss";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

const ExploreBanner = ({ mediaType }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);

  const { data, isLoading } = useFetch(`/${mediaType}/popular`);

  useEffect(() => {
    const sortedData = data?.results?.sort(
      (a, b) => a.popularity > b.popularity
    );
    setMediaList(sortedData?.splice(0, 5));
  }, [data]);

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="exploreBannerContainer">
      {!isLoading && (
        <>
          <div className="bannerContainer">
            {mediaList?.map((media) => (
              <LazyImage src={`${BASE_URL}${media?.backdrop_path}`} />
            ))}
          </div>

          <div className="dotsContainer">
            {mediaList?.map((item, index) => (
              <GoDotFill key={item?.id} className="dot" />
            ))}
          </div>

          <div className="overlayContainer"></div>
        </>
      )}
    </div>
  );
};

export default ExploreBanner;
