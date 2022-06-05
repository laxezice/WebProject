import React, { useState } from "react";
import { Box, Typography, Divider } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@mui/styles";
import Popup from "../../Popup";
import Infomenber from "./Infomenber";

const useStyles = makeStyles({
  imgRad: {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
  },
});
const data = [
  {
    id: 1,
    name: "test",
    email: "test@email.com",
  },
  {
    id: 2,
    name: "test",
    email: "test@email.com",
  },
  {
    id: 3,
    name: "test",
    email: "test@email.com",
  },
];

const Newjoinmenber = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "15%",
          bgcolor: "#6181E0",
          padding: "3%",
          overflowY: "auto",
        }}
        pl={3}
      >
        <Typography variant="h5" color="#fff">
          ผู้สมัครสมาชิกใหม่
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ height: "300px", width: "100%", overflowY: "auto" }}>
        <List
          sx={{ width: "100%", bgcolor: "background.paper", overflowY: "auto" }}
          aria-label="contacts"
        >
          <Box
            sx={{ display: "flex", widht: "100%", bgcolor: "background.paper" }}
            p={1}
          >
            <Box sx={{ width: "20%" }}>
              <Typography variant="h6" color="primary">
                ID
              </Typography>
            </Box>
            <Box sx={{ width: "40%", paddingLeft: "12%" }}>
              <Typography variant="h6" color="primary">
                ชื่อผู้ใช้งาน
              </Typography>
            </Box>
            <Box sx={{ width: "40%", paddingLeft: "10%" }}>
              <Typography variant="h6" color="primary">
                อีเมล์
              </Typography>
            </Box>
          </Box>

          {data.map((d) => (
            <Box
              sx={{ display: "flex", width: "100%", overflow: "hidden" }}
              key={d.id}
            >
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => setOpen(true)}
                  sx={{ borderBottom: "1px solid hsl(0, 0%, 95%)" }}
                >
                  <ListItemText primary={d.id} />
                  <ListItemText primary={d.name + `${d.id}`} />
                  <ListItemText primary={d.email} />
                </ListItemButton>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      <Popup
        title="ข้อมูลสมาชิก"
        openPopup={open}
        onClose={() => {
          setOpen(false);
        }}
        width={"md"}
      >
        <Infomenber />
      </Popup>
    </>
  );
};

export default Newjoinmenber;
