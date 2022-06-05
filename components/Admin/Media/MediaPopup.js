import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Popup from "../../Popup";
import AliceCarousel from "react-alice-carousel";

const styles = {
  images: {
    height: "50vh",
  },
};
const PrevButton = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        left: 0,
        top: 0,
        width: "50px",
      }}
    >
      <FaChevronLeft />
    </div>
  );
};
const NextButton = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        right: 0,
        top: 0,
        width: "50px",
      }}
    >
      <FaChevronRight />
    </div>
  );
};

const MediaPopup = (props) => {
  const { isShow, setIsShow, media } = props;
  const [image, setImage] = useState(1);

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup
        title={media.title}
        width="xl"
        openPopup={isShow}
        onClose={handleClose}
      >
        <Typography variant="h6" sx={{ marginBottom: 3 }}>
          {media.content}
        </Typography>
        <Box sx={{ boxSizing: "border-box" }}>
          <AliceCarousel
            mouseTracking
            infinite
            renderNextButton={NextButton}
            renderPrevButton={PrevButton}
          >
            {media.images.map((image, index) => (
              <Box
                key={index}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                  display: "flex",
                  margin: 0,
                }}
              >
                <img
                  src={image.url}
                  onDragStart={(e) => {
                    e.preventDefault();
                  }}
                  style={styles.images}
                />
              </Box>
            ))}
          </AliceCarousel>
        </Box>
      </Popup>
    </Fragment>
  );
};

export default MediaPopup;
