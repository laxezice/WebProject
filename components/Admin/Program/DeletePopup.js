import React, { Fragment, useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Popup from "../../Popup";

export default function DeletePopup(props) {
  const { open, setOpen, title, text, handler } = props;
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = async () => {
    setLoading(true);
    await handler();
    handleClose();
  };

  return (
    <Fragment>
      {/* Select Channel popup */}
      <Popup title={title} width="md" openPopup={open} onClose={handleClose}>
        <Box>
          <Typography variant="h5">{text}</Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleAction}
              sx={{ position: "relative" }}
            >
              ใช่
              {loading.loading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Button>
            <Button
              variant="contained"
              disabled={loading}
              onClick={handleClose}
              sx={{ ml: 1, bgcolor: "#FF4D4D" }}
            >
              ไม่
            </Button>
          </Box>
        </Box>
      </Popup>
    </Fragment>
  );
}
