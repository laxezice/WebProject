import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

import Popup from "../../Popup";
import SlateViewer from "../RichEditor/SlateViewer";
import TableViewer from "./TableViewer";
import CourseViewer from "./CourseViewer";

const PreviewPopup = (props) => {
  const { isShow, setIsShow, course } = props;

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <Fragment>
      <Popup
        title="ตัวอย่าง"
        width="xl"
        openPopup={isShow}
        onClose={handleClose}
      >
        <CourseViewer course={course} />
      </Popup>
    </Fragment>
  );
};

export default PreviewPopup;
