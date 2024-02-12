import React, { useEffect, useState, useTransition } from "react";

import "./OfficialVideos.styles.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoItem from "../../../components/videoItem/VideoItem";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

const OfficialVideos = ({ videos, videosLoading }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  const itemClickHandler = (key) => {
    setShowVideo(true);
    setVideoKey(key);
  };

  return (
    <div className="videosContainer">
      <ContentWrapper>
        <p className="sectionTitle">Official Videos</p>
        {!videosLoading && (
          <div className="videoItems">
            {videos?.results?.map((video) => {
              return (
                <VideoItem
                  key={video?.id}
                  videoKey={video?.key}
                  title={video?.name}
                  onItemClick={() => itemClickHandler(video?.key)}
                />
              );
            })}
          </div>
        )}
      </ContentWrapper>
      <VideoPopup
        videoKey={videoKey}
        showVideo={showVideo}
        setShowVideo={setShowVideo}
      />
    </div>
  );
};

export default OfficialVideos;
