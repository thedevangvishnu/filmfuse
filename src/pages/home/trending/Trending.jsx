import React, { useState } from "react";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";

import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

const Trending = () => {
  const [timePeriod, setTimePeriod] = useState("day");

  const { data, isLoading } = useFetch(`/trending/all/${timePeriod}`);

  const onTabChangeHandler = (tab) => {
    setTimePeriod(tab === "Day" ? "day" : "week");
  };

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs tabs={["Day", "Week"]} onTabChange={onTabChangeHandler} />
      </ContentWrapper>

      <Carousel content={data?.results} isLoading={isLoading} />
    </div>
  );
};

export default Trending;
