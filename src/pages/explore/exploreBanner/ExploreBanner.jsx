import React, { useEffect, useState, useRef, useMemo } from "react";
import { GoDotFill } from "react-icons/go";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

import useFetch from "../../../hooks/useFetch";

import "./ExploreBanner.styles.scss";
import LazyImage from "../../../components/lazyLoadImage/LazyImage";

const BASE_URL = "https://image.tmdb.org/t/p/original";

const ExploreBanner = ({ mediaType }) => {
  const [mediaIndex, setMediaIndex] = useState(0);
  const [mediaItem, setMediaItem] = useState({});
  const [bg, setBg] = useState("");

  const bannerContainer = useRef();

  const { data, isLoading } = useFetch(`/${mediaType}/popular`);

  const media = useMemo(() => {
    return data?.results
      ?.sort((a, b) => a.popularity > b.popularity)
      ?.splice(0, 5);
  }, [data]);

  useEffect(() => {
    setMediaItem(media?.[mediaIndex]);
    loadItemBanner();
  }, [data, mediaIndex, mediaItem]);

  const loadItemBanner = () => {
    const bgUrl = BASE_URL + mediaItem?.backdrop_path;
    setBg(bgUrl);
  };

  // const scrollContainer = (direction) => {
  //   const container = bannerContainer.current;
  //   const scrollWidth =
  //     direction === "left"
  //       ? container.scrollLeft - container.offsetWidth
  //       : container.scrollLeft + container.offsetWidth;

  //   container.scrollTo({
  //     left: scrollWidth,
  //     behavior: "smooth",
  //   });
  // };

  return (
    <div className="exploreBannerContainer">
      {/* <div
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
      </div> */}

      {!isLoading && (
        <>
          <div className="bannerContainer">
            <LazyImage src={bg} />
          </div>

          <div className="dotsContainer">
            {media?.map((item, index) => (
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
