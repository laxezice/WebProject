import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Divider,
  Typography,
} from "@mui/material/";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup = (props) => {
  const { title, children, openPopup, onClose, width } = props;


  return (
    // <>{title ? haveTitle : notHaveTitle}</>
    <Dialog
      open={openPopup}
      onClose={onClose}
      fullWidth={true}
      maxWidth={width}
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle sx={{ bgcolor: "#FFF" }}>
        <Typography variant="p">{title}</Typography>{" "}
      </DialogTitle>
      <Divider></Divider>
      <DialogContent mt={3}>{children}</DialogContent>
    </Dialog>
  );
};
export default Popup;
