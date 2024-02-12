import React, { useState } from "react";

import "./VideoItem.styles.scss";
import LazyImage from "../lazyLoadImage/LazyImage";
import { FaCirclePlay } from "react-icons/fa6";

const VideoItem = ({ videoKey, title, onItemClick }) => {
  return (
    <div className="videoItemContainer" onClick={onItemClick}>
      <div className="videoThumbnail">
        <LazyImage
          src={`https://img.youtube.com/vi/${videoKey}/mqdefault.jpg`}
        />
        <div className="playIconContainer">
          <FaCirclePlay className="playIcon" />
        </div>
        <div className="thumbnailOverlay"></div>
      </div>
      <p className="videoTitle">{title}</p>
    </div>
  );
};

export default VideoItem;
