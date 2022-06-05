import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useAuth } from "../contexts/Section";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Snackbars = (props) => {
  const { setSnackbar, snackbar} = useAuth()
  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transitionDuration={{ enter: 1000, exit: 2000 }}
        TransitionProps={{ enter: true, exit: false }}
        onClose={() => {
          setSnackbar({...snackbar, open : false})
        }}
      >
        <Alert
          open={snackbar.open}
          variant="outlined"
          // onClose={handleClose}
          severity={snackbar.severity}
          sx={{ width: "100%", bgcolor: "#FFF" }}
        >
          <strong style={{textTransform: 'uppercase'}}>{snackbar.severity} </strong>{snackbar.text}
        </Alert>
      </Snackbar>
    </Stack>
  );
};
export default Snackbars;
