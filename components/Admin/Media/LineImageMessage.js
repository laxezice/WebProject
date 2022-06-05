import React from "react";
import { Box } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const styles = {
  message: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    paddingRight: 0,
  },
  header: {
    minHeight: 350,
    height: "75%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "20px 20px 0px 0px",
  },
  footer: {
    display: "flex",
    height: "25%",
  },
  footerLeft: {
    minHeight: 100,
    width: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0px 0px 0px 20px",
  },
  footerRight: {
    minHeight: 100,
    width: "50%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: "0px 0px 20px 0px",
  },
};

const LineImageMessage = (props) => {
  const { images } = props;

  return (
    <Box style={styles.message} sx={{ padding: 2 }}>
      <Box
        style={styles.header}
        sx={{ backgroundImage: `url(${images[0].url})` }}
      ></Box>
      <Box style={styles.footer}>
        <Box
          style={styles.footerLeft}
          sx={{ backgroundImage: `url(${images[1].url})` }}
        ></Box>
        <Box
          style={styles.footerRight}
          sx={{ backgroundImage: `url(${images[2].url})` }}
        ></Box>
      </Box>
    </Box>
  );
};

export default LineImageMessage;
