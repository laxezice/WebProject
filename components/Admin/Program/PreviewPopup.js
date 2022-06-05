import React, { Fragment, useState } from "react";
import { Box, Typography } from "@mui/material";

import Popup from "../../Popup";
import ProgramViewer from "./ProgramViewer";

const PreviewPopup = (props) => {
  const { isShow, setIsShow, program } = props;

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
        <ProgramViewer program={program} />
      </Popup>
    </Fragment>
  );
};

export default PreviewPopup;
