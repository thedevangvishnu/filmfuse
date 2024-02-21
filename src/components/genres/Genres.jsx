import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import "./Genres.styles.scss";

const Genres = ({ genreIds, hasbars = false }) => {
  const { genres } = useContext(AppContext);

  return (
    <div className="genres">
      {genreIds?.map((id, index) => (
        <>
          <p key={id} className="genreItem">
            {genres[id].name}
          </p>
          {hasbars && index !== genreIds.length - 1 && (
            <div className="bar"></div>
          )}
        </>
      ))}
    </div>
  );
};

export default Genres;
