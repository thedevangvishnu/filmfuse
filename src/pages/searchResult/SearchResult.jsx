import React from "react";
import { useParams } from "react-router-dom";

import "./SearchResult.styles.scss";

const SearchResult = () => {
  const { query } = useParams();
  return <div>SearchResult</div>;
};

export default SearchResult;
