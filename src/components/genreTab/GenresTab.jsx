import React from "react";

const GenresTab = ({ genre, onTabClick }) => {
  return (
    <div className="genresTab" onClick={onTabClick}>
      {genre}
    </div>
  );
};

export default GenresTab;
