import React from "react";

import ReactPlayer from "react-player/youtube";

import "./VideoPopup.styles.scss";

const VideoPopup = ({ videoKey }) => {
  return (
    <div className="videoPopup">
      <div className="opacityLayer"></div>
      <div className="videoPlayerContainer">
        <ReactPlayer url={`https://www.youtube.com/watch?v=${videoKey}`} />
      </div>
    </div>
  );
};

export default VideoPopup;
