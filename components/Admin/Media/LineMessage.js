import React from "react";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";
import FormatContent from "./FormatContent";

const styles = {
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

const LineMessage = (props) => {
  const { media } = props;
  return (
    <Box style={styles.message} sx={{ padding: 2 }}>
      <Box
        style={styles.image}
        sx={{ backgroundImage: `url(${media.images[0].url})` }}
      ></Box>
      <Box style={styles.content} sx={{ padding: 2 }}>
        <FormatContent content={media.content} />
      </Box>
      <Box style={styles.msButton} sx={{ padding: 2 }}>
        ดูเพิ่มเติม
      </Box>
    </Box>
  );
};

export default LineMessage;
