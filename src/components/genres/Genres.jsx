import React, { useContext } from "react";

import { AppContext } from "../../context/AppContext";

import "./Genres.styles.scss";

const Genres = ({ genreIds }) => {
  const { genres } = useContext(AppContext);

  return (
    <div className="genres">
      {genreIds?.map((id) => (
        <p key={id} className="genreItem">
          {genres[id].name}
        </p>
      ))}
    </div>
  );
};

export default Genres;
