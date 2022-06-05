import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

import SlateViewer from "../RichEditor/SlateViewer";
import TableViewer from "./TableViewer";

export default function ContentViewer(props) {
  const { data } = props;

  const updateContent = () => {};

  const renderContent = (content, index) => {
    if (content.type === "paragraph") {
      return <SlateViewer value={content.content} setValue={updateContent} />;
    } else if (content.type === "image") {
      return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <img
            src={content.url}
            style={{
              display: "block",
              width: "70%",
              height: "auto",
              margin: "2px 0px",
            }}
          />
        </Box>
      );
    } else if (content.type === "table") {
      return <TableViewer content={content} />;
    }
    return null;
  };

  return (
    <Fragment>
      {data.map((content, index) => (
        <Box
          sx={{ position: "relative", marginTop: 2, marginBottom: 2 }}
          key={index}
        >
          {renderContent(content, index)}
        </Box>
      ))}
    </Fragment>
  );
}
