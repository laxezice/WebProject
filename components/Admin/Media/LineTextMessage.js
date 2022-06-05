import React from "react";
import { Box } from "@mui/material";
import FormatContent from "./FormatContent";

const styles = {
  message: {
    width: 350,
    display: "flex",
    flexDirection: "column",
    minHeight: 450,
  },
  content: {
    borderRadius: "20px 20px 0px 0px",
    backgroundColor: "#FFFFFF",
    height: "100%",
    minHeight: 350,
    boxSizing: "border-box",
  },
  msButton: {
    backgroundColor: "#FFFFFF",
    textAlign: "center",
    color: "#42659a",
    borderRadius: "0px 0px 20px 20px",
    minHeight: 100,
    boxSizing: "border-box",
  },
};

const LineTextMessage = (props) => {
  const { content } = props;
  return (
    <Box style={styles.message} sx={{ padding: 2 }}>
      <Box style={styles.content} sx={{ padding: 2 }}>
        <FormatContent content={content} />
      </Box>
      <Box style={styles.msButton} sx={{ padding: 2 }}>
        ดูเพิ่มเติม
      </Box>
    </Box>
  );
};

export default LineTextMessage;
