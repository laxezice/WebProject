import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

import ContentViewer from "../Course/ContentViewer";

export default function CourseViewer(props) {
  
  const { program } = props;
  const toParagrph = (title, content) => {
    return {
      type: "paragraph",
      content: [
        {
          type: "headingTwo",
          children: [{ text: title, color: "#0066cc" }],
        },
        {
          type: "paragraph",
          children: [{ text: content, color: "#000000" }],
        },
      ],
    };
  };

  const prepareContent = () => {
    return [
      toParagrph("ชื่อภาษาไทย", program.thaiName),
      toParagrph("ชื่อภาษาอังกฤษ", program.engName),
      ...program.contents,
    ];
  };

  return (
    <Fragment>
      <ContentViewer data={prepareContent()} />
    </Fragment>
  );
}
