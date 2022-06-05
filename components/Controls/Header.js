import React from "react";
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
const Header = (props) => {
  const { headerName, adminName } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirecetion: "row",
        borderBottom: "3px solid #2D569E",
        mx: "auto",
      }}
      mt={3}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h4" color="#2D569E" sx={{ paddingBottom: "2%" }}>
          {headerName}
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Typography
          variant="h6"
          sx={{
            paddingRight: "1rem",
            color: "#2D569E",
          }}
        >
          {adminName}
        </Typography>
      </Box>
    </Box>
  );
};
export default Header;
