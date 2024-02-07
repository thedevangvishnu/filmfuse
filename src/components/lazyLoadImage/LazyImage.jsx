import { LazyLoadImage } from "react-lazy-load-image-component";

import React from "react";

const LazyImage = ({ className, src }) => {
  return (
    <LazyLoadImage className={className || ""} src={src} effect="blur" alt="" />
  );
};

export default LazyImage;
