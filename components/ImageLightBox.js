import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";


const ImageLightBox = (props) => {
  const { images, setOpen, start } = props;
  const [photoIndex, setPhotoIndex] = useState(start);

  return (
    <Lightbox
      mainSrc={images[photoIndex]}
      nextSrc={images[(photoIndex + 1) % images.length]}
      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
      onCloseRequest={() => {setOpen(false)}}
      onMovePrevRequest={() =>
        setPhotoIndex((photoIndex + images.length - 1) % images.length)
      }
      onMoveNextRequest={() =>
        setPhotoIndex((photoIndex + 1) % images.length)
      }
    />
  );
};
export default ImageLightBox;
