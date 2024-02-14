import React, { useEffect, useState, useRef } from "react";
import { GoDotFill } from "react-icons/go";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import useFetch from "../../../hooks/useFetch";

import "./ExploreBanner.styles.scss";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

const ExploreBanner = ({ mediaType }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaList, setMediaList] = useState([]);
  const bannerContainer = useRef();

  const { data, isLoading } = useFetch(`/${mediaType}/popular`);

  useEffect(() => {
    const sortedData = data?.results?.sort(
      (a, b) => a.popularity > b.popularity
    );
    setMediaList(sortedData?.splice(0, 5));
  }, [data]);

  useEffect(() => {});

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const scrollContainer = (direction) => {
    const container = bannerContainer.current;
    const scrollWidth =
      direction === "left"
        ? container.scrollLeft - container.offsetWidth
        : container.scrollLeft + container.offsetWidth;

    container.scrollTo({
      left: scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="exploreBannerContainer">
      <div
        className="leftArrowContainer"
        onClick={() => scrollContainer("left")}
      >
        <FaCircleChevronLeft className="arrow" />
      </div>

      <div
        className="rightArrowContainer"
        onClick={() => scrollContainer("right")}
      >
        <FaCircleChevronRight className="arrow" />
      </div>

      {!isLoading && (
        <>
          <div className="bannerContainer" ref={bannerContainer}>
            {mediaList?.map((media) => {
              return (
                <>
                  <LazyImage src={`${BASE_URL}${media?.backdrop_path}`} />
                </>
              );
            })}
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
