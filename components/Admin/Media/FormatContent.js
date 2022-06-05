import React, { Fragment, useState } from "react";
import { Typography } from "@mui/material";

const FormatContent = (props) => {
  const { content } = props;

  return (
    <Fragment>
      {content.split("\n").map((p, index) => {
        if (p !== "") {
          return (
            <Typography
              sx={{ fontSize: "inherit", fontWeight: "inherit" }}
              key={index}
            >
              {p}
            </Typography>
          );
        } else {
          return <Typography sx={{ mb: 1.5 }} key={index}></Typography>;
        }
      })}
    </Fragment>
  );
};

export default FormatContent;
