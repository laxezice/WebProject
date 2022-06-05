import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";
import Headers from "../../User/Home/Header";
import ContentViewer from "./ContentViewer";

export default function CourseViewer(props) {
  const { course } = props;

  const prepareContent = () => {
    let description = {
      type: "paragraph",
      content: [
        {
          type: "headingTwo",
          children: [{ text: "คำอธิบายการอบรม", color: "#0066cc" }],
        },
        {
          type: "paragraph",
          children: [{ text: course.description, color: "#000000" }],
        },
      ],
    };

    return [description, ...course.contents];
  };

  return (
    <Fragment>
      <ContentViewer data={prepareContent()} />
    </Fragment>
  );
}
