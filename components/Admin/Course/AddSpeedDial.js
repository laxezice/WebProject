import React, { useState } from "react";
import Box from "@mui/material/Box";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@mui/material";
import { IoText } from "react-icons/io";
import { BsTable, BsImage } from "react-icons/bs";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import TableChartIcon from "@mui/icons-material/TableChart";
import ImageIcon from "@mui/icons-material/Image";
const actions = [
  { icon: <TableChartIcon />, name: "Add table" },
  { icon: <ImageIcon />, name: "Add image" },
  { icon: <TextFieldsIcon />, name: "Add paragraph" },
];

export default function AddSpeedDial(props) {
  const [open, setOpen] = useState(false);
  const { addContent } = props;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClicked = (action) => {
    if (action === "Add paragraph") {
      addContent("paragraph");
    } else if (action === "Add image") {
      addContent("image");
    } else if (action === "Add table") {
      addContent("table");
    }
    handleClose();
  };

  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      sx={{ position: "absolute", bottom: 50, right: 50 }}
      icon={<SpeedDialIcon />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            handleClicked(action.name);
          }}
        />
      ))}
    </SpeedDial>
  );
}
