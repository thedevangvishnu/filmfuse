import React, { useState } from "react";

import "./SwitchTabs.styles.scss";

const SwitchTabs = ({ tabs, onTabChange }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [leftPosition, setLeftPosition] = useState(0);

  const activateTab = (tab, index) => {
    setActiveTabIndex(index);
    setLeftPosition(index * 80);
    onTabChange(tab);
  };

  return (
    <div className="switchTabsContainer">
      <div className="tabItems">
        {tabs.map((tab, index) => {
          return (
            <span
              key={tab}
              className={`tabItem ${
                activeTabIndex === index ? "active" : null
              }`}
              onClick={() => activateTab(tab, index)}
            >
              {tab}
            </span>
          );
        })}

        <div className="movingBg" style={{ left: leftPosition }}></div>
      </div>
    </div>
  );
};

export default SwitchTabs;
