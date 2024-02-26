import React, { useEffect, useState, useTransition } from "react";
import dayjs from "dayjs";
import { FaCirclePlay } from "react-icons/fa6";

import useFetch from "../../../hooks/useFetch";

import LazyImage from "../../../components/lazyLoadImage/LazyImage";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
import VideoPopup from "../../../components/videoPopup/VideoPopup";

import "./DetailsBanner.styles.scss";

const DetailsBanner = ({ data, crew, videos, videosLoading }) => {
  const [showVideo, setShowVideo] = useState(false);
  const [videoKey, setVideoKey] = useState("");

  useEffect(() => {
    const videoKey =
      videos?.results?.length > 0
        ? videos?.results?.filter(
            (item) => item?.type === "Trailer" || item?.type === "Teaser"
          )[0]?.key
        : null;

    setVideoKey(videoKey);
  }, [videos]);

  const directors = crew?.filter(
    (crewMember) =>
      crewMember.job === "Director" ||
      crewMember.known_for_department === "Directing"
  );
  const writers = crew?.filter(
    (crewMember) =>
      crewMember.job === "Writer" ||
      crewMember.job === "Screenplay" ||
      crewMember.job === "Story" ||
      crewMember.known_for_department === "Writing"
  );

  const BASE_URL = "https://image.tmdb.org/t/p/original";

  const backdropUrl = `${BASE_URL}${data?.backdrop_path}`;
  const posterUrl = `${BASE_URL}${data?.poster_path}`;

  const formatDuration = (duration) => {
    const hours = (duration / 60).toFixed(0);
    const minutes = duration % 60;

    const totalDuration = `${hours}hrs ${minutes}mins`;
    return totalDuration;
  };

  return (
    <div className="detailsBanner">
      <div className="detailsBackdropContainer">
        <LazyImage src={`${backdropUrl}`} />
        <div className="overlayContainer"></div>
      </div>

      <ContentWrapper>
        {/* left section */}
        <div className="leftSection">
          <div className="posterContainer">
            <LazyImage src={posterUrl} />
          </div>
        </div>

        {/* right section */}
        <div className="rightSection">
          {/* title */}
          <div className="titleContent">
            <div className="title">
              <h3>
                {data?.title || data?.name}{" "}
                <span>({dayjs(data?.release_date).format("YYYY")})</span>
              </h3>
            </div>
            <div className="description">
              <p>{data?.tagline}</p>
            </div>
          </div>

          {/* genre */}
          <div className="genresContainer">
            <Genres genreIds={data?.genres.map((genre) => genre.id)} />
          </div>

          {/* rating */}
          <div className="ratingAndTrailer">
            <div className="ratingContainer">
              <CircleRating rating={data?.vote_average?.toFixed(1)} />
            </div>
            <div
              className="trailerContainer"
              onClick={() => setShowVideo(true)}
            >
              <FaCirclePlay className="playIcon" />
              <span>Watch Trailer</span>
            </div>
          </div>

          {/* overview */}
          <div className="overviewContainer">
            <p className="overviewHeading">Overview</p>
            <p className="overviewContent">{data?.overview}</p>
          </div>

          {/* metaData */}
          <div className="metaDataContainer">
            <div className="metaDataItems">
              {/* status, release data and duration */}
              <div className="metaDataItem">
                <div className="subItem">
                  <p className="tag">Status:</p>
                  <p className="value">{data?.status}</p>
                </div>

                <div className="subItem">
                  <p className="tag">Release:</p>
                  <p className="value">
                    {dayjs(data?.release_date).format("MMM D, YYYY")}
                  </p>
                </div>

                <div className="subItem">
                  <p className="tag">Duration:</p>
                  <p className="value">{formatDuration(data?.runtime)}</p>
                </div>
              </div>

              {/* directors */}
              <div className="metaDataItem">
                <div className="subItem crew">
                  <p className="tag">Directors:</p>

                  <p className="value">
                    {directors?.map((director, index) =>
                      directors.length <= 0
                        ? "Not available"
                        : directors.length === 1
                        ? director?.name
                        : index === directors.length - 1
                        ? director?.name
                        : director?.name + ", "
                    )}
                  </p>
                </div>
              </div>

              {/* writers */}
              <div className="metaDataItem">
                <div className="subItem crew">
                  <p className="tag">Writers:</p>
                  <p className="value">
                    {writers?.map((writer, index) =>
                      writers.length < 1
                        ? "Not available"
                        : writers.length === 1
                        ? writer?.name
                        : index === writers.length - 1
                        ? writer?.name
                        : writer?.name + ", "
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!videosLoading && (
            <VideoPopup
              videoKey={videoKey}
              showVideo={showVideo}
              setShowVideo={setShowVideo}
            />
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default DetailsBanner;
