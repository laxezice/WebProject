import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import React from "react";

const Carousel = (props) => {
  return (
    <>
      <AliceCarousel autoPlay autoPlayInterval="3000" autoHeight autoWidth>
        <img
          src="https://picsum.photos/500/500
"
          className="sliderimg"
        />
        <img
          src="https://picsum.photos/500/500
"
          className="sliderimg"
        />
        <img
          src="https://picsum.photos/200
"
          className="sliderimg"
        />
        <img
          src="https://picsum.photos/200
"
          className="sliderimg"
        />
      </AliceCarousel>
    </>
  );
};
export default Carousel;
