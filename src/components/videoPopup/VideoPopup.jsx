import React from "react";

import ReactPlayer from "react-player/youtube";

import "./VideoPopup.styles.scss";

const VideoPopup = ({ videoKey, showVideo, setShowVideo }) => {
  return (
    <div className={`videoPopup ${showVideo ? "visible" : "null"}`}>
      <div className="opacityLayer" onClick={() => setShowVideo(false)}></div>
      <div className="videoPlayer">
        <span onClick={() => setShowVideo(false)} className="closeBtn">
          Close
        </span>
        {videoKey && (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            width="100%"
            height="100%"
            controls
          />
        )}

        {!videoKey && (
          <div className="errorContainer">
            <p>Not Available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPopup;
