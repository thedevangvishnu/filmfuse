import React from "react";

const GenresTab = ({ genre, onTabClick, active = "" }) => {
  return (
    <div
      className={`genresTab ${active === true ? "activeTab" : ""}`}
      onClick={onTabClick}
    >
      {genre}
    </div>
  );
};

export default GenresTab;
