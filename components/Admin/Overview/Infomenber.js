import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Divider, Typography } from "@mui/material";
const Infomenber = (porps) => {
  return (
    <Box sx={{ width: "100%", height: "100%" }}>
        <Divider/>
      <Box sx={{ width: "100%", display: "flex" }} m={1} p={2}>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="ชื่อ"
            defaultValue="ธนวัฒน์"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="นามสกลุล"
            defaultValue="ปีตวิบลเสถียร"
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%", display: "flex" }} m={1} p={2}>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="ชื่อภาษาอังกฤษ"
            defaultValue="Thanawath"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="นามสกลุลภาษาอังกฤษ"
            defaultValue="Petavibornsaten"
          />
        </Box>
      </Box>
      <Divider/>
      <Box sx={{ width: "100%", display: "flex" }} m={1} p={2}>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="Email"
            defaultValue="ivyivyort@gmail.com"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="เบอโทร"
            defaultValue="0865880999"
          />
        </Box>
      </Box>

      <Box sx={{ width: "100%", display: "flex" }} m={1} p={2}>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="วันเกิด"
            defaultValue="ivyivyort@gmail.com"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="อายุ"
            defaultValue="0865880999"
          />
        </Box>
      </Box>
      <Divider/>
      <Box sx={{ width: "100%", display: "flex" }} m={1} p={2}>
        <Box sx={{ width: "50%" }}>
          <TextField sx={{width : '80%'}}
            disabled
            id="outlined-disabled"
            label="วุฒิการศึกษา"
            defaultValue="ivyivyort@gmail.com"
          />
        </Box>
        <Box sx={{ width: "50%" }}>
          <TextField
            disabled
            id="outlined-disabled"
            label="อายุ"
            defaultValue="0865880999"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Infomenber;
