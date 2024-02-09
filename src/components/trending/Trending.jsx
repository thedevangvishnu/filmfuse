import React, { useState } from "react";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import SwitchTabs from "../switchTabs/SwitchTabs";

import useFetch from "../../hooks/useFetch";
import Carousel from "../carousel/Carousel";

const Trending = () => {
  const [timePeriod, setTimePeriod] = useState("day");

  const { data } = useFetch(`/trending/all/${timePeriod}`);

  const onTabChangeHandler = (tab) => {
    setTimePeriod(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs tabs={["Day", "Week"]} onTabChange={onTabChangeHandler} />
      </ContentWrapper>

      <Carousel content={data?.results} />
    </div>
  );
};

export default Trending;
