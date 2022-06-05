import { Box, Typography } from "@mui/material";
import { BsCalendarWeek } from "react-icons/bs";
import { FcCalendar } from "react-icons/fc";
import { HiOutlineClock } from "react-icons/hi";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Clock from "react-live-clock";


const Headers = (props) => {
  const { textHeader } = props;
  const [date, setDate] = useState(format(new Date(), "dd/MM/yyyy"));
  const [imags, setImags] = useState(
    "https://kaijeaw.in.th/wp-content/uploads/2020/04/ai.jpg"
  );
  return (
    <Box sx={{ height: "100%", width: "100%", bgcolor: "#2D569E" }} mt={0}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          alignItems: "center",
          position: "relative",
        }}
      >
          <Typography
            variant="h5"
            pl={6}
            sx={{ position: "absolute", top: "40%", zIndex: 1, color: "#fff" }}
          >
            {textHeader}
          </Typography>
        <img
          style={{
            objectFit: "cover",
            width: "100%",
            height: "18.8vh",
            opacity: "30%",
          }}
          src={imags}
        ></img>
      </Box>
      {/* time and calandar */}
      <Box
        sx={{
          bgcolor: "#fff",
          height: "25%",
          paddingLeft: "80%",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        }}
      >
        <Box sx={{ height: "100%", width: "100%", bgcolor: "#fff" }}>
          <Box sx={{ height: "100%", display: "flex", alignItems: "center" }}>
            <BsCalendarWeek color="#2D569E" size={20} />
            <Typography mr={2} ml={2} color="#2D569E">
              {date}
            </Typography>
            <HiOutlineClock color="#2D569E" size={25} mr={1} />
            <Typography color="#2D569E" ml={2}>
              <Clock
                format={"HH:mm:ss"}
                ticking={true}
                timezone={"Asia/Bangkok"}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Headers;
