import React from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Stack,
  IconButton,
} from "@mui/material";
import { BiEditAlt, BiTrash, BiShareAlt } from "react-icons/bi";

const Itemlist = (props) => {
  const { itemName, icon1, icon2, icon3 } = props;

  return (
    <Box componect="div" m={2}>
      <Box
        sx={{
          display: "flex ",
          width: "90%",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.04)",
          marginBottom: "0.6rem",
          border: "1px solid  #E2E2E2",
          borderRadius: "18px",
          paddingLeft: "1%",
          paddingRight: "1%",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <p>{itemName}</p>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            height: "2rem",
            width: "2rem",
            border: "2px solid #2D569E",
            borderRadius: "50%",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "3px",
            marginRight: "3px",
          }}
        >
          <BiEditAlt size={20} color="#primary" />
        </Box> */}

        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton aria-label="share" size="large">
            <BiShareAlt size={22} color="#12BC60" />
          </IconButton>
          <IconButton aria-label="edit" size="large">
            <BiEditAlt size={22} color="#2D569E" />
          </IconButton>
          <IconButton aria-label="delete" size="large">
            <BiTrash size={22} color="#FF4D4D" />
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};

export default Itemlist;
