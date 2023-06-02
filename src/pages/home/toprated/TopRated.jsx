import React, { useState } from "react";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/wrapperComponent/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import "../../home/style.scss"
import useFetch from "../../../hooks/useFetch";

const TopRated = () => {
    const [endpoint, setEndpoint] = useState("movie");

    const { data, loading } = useFetch(`/${endpoint}/top_rated`);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Top Rated</span>
                <SwitchTabs data={["Movies", "TV Shows"]}  onTabChange={onTabChange} />
            </ContentWrapper>
            <Carousel data={data?.results} endpoint={endpoint} loading={loading} />
        </div>
    );
};

export default TopRated;