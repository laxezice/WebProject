import { Box } from "@mui/material";
import Appbar from "../components/Appbar";
import Snackbars from "../components/Snackbar";
import React, { useState } from "react";

export default function BaseLayout({ children }) {
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Box sx={{ height: "5%", boxSizing: "border-box" }}>
        <Appbar />
      </Box>
      {children}
      <Snackbars></Snackbars>
    </Box>
  );
}
