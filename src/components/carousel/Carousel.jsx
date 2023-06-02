import React, { useState, useRef } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../wrapperComponent/ContentWrapper";
import Img from "../lazyLoadingComponents/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";

const Carousel = ({ title, data, loading, endpoint }) => {
  const { url } = useSelector((state) => state.homeSlice);
  const carouselContent = useRef();
  const navigate = useNavigate();
  const handleMovement = (direction) => {
    const container = carouselContent.current;

    const scrollAmount =
      direction === "left"
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20);
    container.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const skItem = () => {
    return (
      <div className="skeletonItem">
        <div className="posterBlock skeleton"></div>
        <div className="textBlock">
          <div className="title skeleton"></div>
          <div className="date skeleton"></div>
        </div>
      </div>
    );
  };

  const handleContent = (mediaType, id) => {
    const type = mediaType ? mediaType : endpoint;

    navigate(`/${type}/${id}`);
  };
  return (
    <div className="carousel">
      <ContentWrapper>
        {title && <div className="carouselTitle">{title}</div>}
        <BsFillArrowLeftCircleFill
          className="carouselLeftNav arrow"
          onClick={() => handleMovement("left")}
        />
        <BsFillArrowRightCircleFill
          className="carouselRightNav arrow"
          onClick={() => handleMovement("right")}
        />
        {!loading ? (
          <div className="carouselItems" ref={carouselContent}>
            {data?.map((item) => {
              return (
                <div
                  className="carouselItem"
                  key={item.id}
                  onClick={() => handleContent(item.media_type, item.id)}>
                  <div className="posterBlock">
                    {item.poster_path ? (
                      <Img src={url.poster + item.poster_path} />
                    ) : (
                      <Img src={PosterFallback} />
                    )}
                    <CircleRating rating={item.vote_average.toFixed(1)} />
                    <Genres data={item.genre_ids.slice(0, 2)} />
                  </div>
                  <div className="textBlock">
                    <div className="title">{item.name || item.title}</div>
                    <div className="date">
                      {dayjs(item.release_date).format("MMM D, YYYY")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="loadingSkeleton">
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
            {skItem()}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default Carousel;
