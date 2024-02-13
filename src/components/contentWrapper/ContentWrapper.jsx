import React from "react";

import "./ContentWrapper.styles.scss";

const ContentWrapper = ({ children }) => {
  return <div className="contentWrapper">{children}</div>;
};

export default ContentWrapper;
