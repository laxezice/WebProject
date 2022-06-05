import React, { Fragment, useState } from "react";
import { Box } from "@mui/material";
import HorizontalScroll from "./HorizontalScroll";
import LineMessage from "./LineMessage";
import LineImageMessage from "./LineImageMessage";
import LineTextMessage from "./LineTextMessage";

const styles = {
  screen: {
    width: 500,
    height: 600,
    backgroundColor: "#849ebf",
    overflow: "hidden",
  },
  message: {
    width: 320,
    display: "flex",
    flexDirection: "column",
    paddingRight: 0,
  },
  image: {
    height: 300,
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px 20px 0px 0px",
  },
  content: {
    backgroundColor: "#FFFFFF",
  },
  msButton: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    color: "#42659a",
    borderRadius: "0px 0px 20px 20px",
  },
};

const LinePreview = (props) => {
  const { media } = props;
  let mediaData = { ...media };
  mediaData.content = media.content.slice(0, 450) + "...";

  const selectFormat = () => {
    if (media.images.length > 2) {
      return (
        <HorizontalScroll>
          <LineImageMessage images={mediaData.images} itemId={1} />
          <LineTextMessage content={mediaData.content} itemId={2} />
        </HorizontalScroll>
      );
    } else {
      return <LineMessage media={mediaData} />;
    }
  };

  return (
    <Fragment>
      <Box style={styles.screen}>{selectFormat()}</Box>
    </Fragment>
  );
};

export default LinePreview;
