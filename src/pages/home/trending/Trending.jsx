import React, { useState } from "react";
import ContentWrapper from "../../../components/wrapperComponent/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import "./style.scss";

const Trending = () => {
  const [endPoint, setEndPoint] = useState("day");
  const handleTabChange = (tab) => {
    setEndPoint(tab === "Day" ? "day" : "week");
  };

  const response = useFetch(`/trending/all/${endPoint}`);
  console.log(`/trending/all/${endPoint}`)
  const {data,loading} = response
  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending</span>
        <SwitchTabs data={["Days", "Weeks"]} onTabChange={()=>handleTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} loading={loading} />
    </div>
  );
};

export default Trending;
